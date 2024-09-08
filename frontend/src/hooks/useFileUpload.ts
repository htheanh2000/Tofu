import axios, { AxiosProgressEvent } from "axios";
import { useState } from "react";

export interface FileWithStatus {
    file: File;
    status: 'pending' | 'success' | 'error';
    progress?: number;
}

export type TFileStatus =  'pending' | 'success' | 'error';


const MAX_RETRIES = 3;

const useFileUpload = () => {
    const [files, setFiles] = useState<FileWithStatus[]>([]);

    const uploadFile = (file: File, retries = MAX_RETRIES) => {
        return new Promise<void>((resolve, reject) => {
            const formData = new FormData();
            
            formData.append("file", file);

            const attemptUpload = (retryCount: number) => {
                axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
                    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                        const progress = progressEvent.total
                            ? (progressEvent.loaded / progressEvent.total) * 100
                            : 0;
                        setFiles(prevFiles => prevFiles.map(f =>
                            f.file.name === file.name ? { ...f, progress } : f
                        ));
                    }
                })
                .then(() => {
                    setFiles(prevFiles => prevFiles.map(f =>
                        f.file.name === file.name ? { ...f, status: 'success' as const } : f
                    ));
                   
                    resolve();
                })
                .catch(() => {
                    if (retryCount > 0) {
                        attemptUpload(retryCount - 1);
                    } else {
                        setFiles(prevFiles => prevFiles.map(f =>
                            f.file.name === file.name ? { ...f, status: 'error' as const } : f
                        ));
                        reject();
                    }
                });
            };

            attemptUpload(retries);
        });
    };

    return { files, setFiles, uploadFile };
};

export default useFileUpload;
