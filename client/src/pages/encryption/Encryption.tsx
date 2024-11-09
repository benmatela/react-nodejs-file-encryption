import React, { useState } from 'react'
import { FileUpload } from '../../components/FileUpload'
import { AESBlockSize } from '../../models/enums/encryption.enum';
import { useForm } from 'react-hook-form';
import { IEncryptFileRequest } from '../../models/encryption.model';

export const Encryption = () => {
    const form = useForm<IEncryptFileRequest>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const [shouldEncrypt, setShouldEncrypt] = useState<boolean>(true);
    const [aesBlockSize, setAesBlockSize] = useState<AESBlockSize>(AESBlockSize.AES_256);
    const [encryptionPassword, setEncryptionPassword] = useState<string>("");

    /**
     * Submits the form to the encryption API
     * 
     * @param {IEncryptFileRequest} formData 
     */
    const onSubmit = (formData: IEncryptFileRequest) => {
        try {
            console.log("formData: ", formData);
        } catch (error: any) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <h3>Encryption</h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=""
                noValidate
            >
                <div className="mb-6">
                    <label
                        className=""
                        htmlFor="encryptionPassword"
                        data-testid={"encryptionPassword"}
                    >
                        Encryption Password:
                    </label>
                    <input
                        className=""
                        id="encryptionPassword"
                        data-testid={"encryptionPassword"}
                        autoComplete="false"
                        type="password"
                        placeholder="encryption password"
                        {...register("encryptionPassword", {
                            required: "Encryption Password is required",
                        })}
                    />
                    <p className="error text-red-500">{errors.encryptionPassword?.message}</p>
                </div>
                <FileUpload
                    shouldEncrypt={shouldEncrypt}
                    aesBlockSize={aesBlockSize}
                    encryptionPassword={encryptionPassword}
                    currentForm={form}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
