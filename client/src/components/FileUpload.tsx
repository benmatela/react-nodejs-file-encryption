import React, { useState } from 'react'
import { AESBlockSize } from '../models/enums/encryption.enum';

type FileUploadProps = {
    /**
     * Should we encrypt this file?
     */
    shouldEncrypt: boolean;
    /**
     * `AES` block size to be used by the API to encrypt this file
     */
    aesBlockSize: AESBlockSize;
    /**
     * Password to be used when `encrypting/decrypting` this file
     */
    encryptionPassword: string;
}

/**
 * Upload a file to the API with the option to encrypt the file
 * 
 * @returns {JSX.Element} component
 */
export const FileUpload = ({
    shouldEncrypt,
    aesBlockSize,
    encryptionPassword
}: FileUploadProps): JSX.Element => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [uploadStatus, setUploadStatus] = useState<string>("");
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    /**
     * Handles file select change
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target && event.target.files) {
            const file = event.target.files[0];
            setSelectedFile(file);
        }
    };

    /**
     * Handles file upload to the API 
     * 
     * This will break the selected file into 5MB chunks and send them to
     * the API, which will encrypt and merge the file chunks into a whole file.
     */
    const handleFileUpload = () => {
        try {
            if (!selectedFile) {
                alert("Please select a file to upload.");
                return;
            }

            // 5MB per chunk (adjust based on your requirements)
            const chunkSize = 5 * 1024 * 1024;
            const totalChunks = Math.ceil(selectedFile.size / chunkSize);
            const chunkProgress = 100 / totalChunks;
            let chunkNumber = 0;
            let start = 0;
            let end = 0;

            /**
             * Uploads the selected file in chunks
             */
            const uploadNextChunk = async () => {
                if (end <= selectedFile.size) {
                    const chunk = selectedFile.slice(start, end);
                    const formData = new FormData();
                    formData.append("file", chunk);
                    formData.append("chunkNumber", String(chunkNumber));
                    formData.append("totalChunks", String(totalChunks));
                    formData.append("originalname", selectedFile.name);

                    fetch("http://localhost:4000/encrypt", {
                        method: "POST",
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log({ data });
                            const temp = `Chunk ${chunkNumber + 1}/${totalChunks} uploaded successfully`;
                            setUploadStatus(temp);
                            setUploadProgress(Number((chunkNumber + 1) * chunkProgress));
                            console.log(temp);
                            chunkNumber++;
                            start = end;
                            end = start + chunkSize;
                            uploadNextChunk();
                        })
                        .catch((error: Error) => {
                            console.error("Error uploading chunk:", error.message);
                        });
                } else {
                    setUploadProgress(100);
                    setSelectedFile(undefined);
                    setUploadStatus("File upload completed");
                }
            };

            uploadNextChunk();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div id='fileUpload'>
            <h2>Resumable File Upload</h2>
            <h3>{uploadStatus}</h3>
            {uploadProgress > 0 && <progress value={uploadProgress} />}
            <input id='file' type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
    );
}
