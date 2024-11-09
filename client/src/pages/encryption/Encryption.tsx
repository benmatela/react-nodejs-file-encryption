import React, { useState } from 'react'
import { FileUpload } from '../../components/FileUpload'
import { AESBlockSize } from '../../models/enums/encryption.enum';

export const Encryption = () => {
    const [shouldEncrypt, setShouldEncrypt] = useState<boolean>(true);
    const [aesBlockSize, setAesBlockSize] = useState<AESBlockSize>(AESBlockSize.AES_256);
    const [encryptionPassword, setEncryptionPassword] = useState<string>("");
    return (
        <div>
            <h3>Encryption</h3>
            <FileUpload
                shouldEncrypt={shouldEncrypt}
                aesBlockSize={aesBlockSize}
                encryptionPassword={encryptionPassword}
            />
        </div>
    )
}
