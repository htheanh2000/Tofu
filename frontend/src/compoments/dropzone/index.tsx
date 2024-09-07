import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosProgressEvent } from 'axios';
import { LinearProgress, Box, Typography } from '@mui/material';

interface FileWithStatus {
    file: File;
    status: 'pending' | 'success' | 'error';
    progress?: number;
}

const FileUpload = () => {
    const [files, setFiles] = useState<FileWithStatus[]>([]);

    // const onDrop = useCallback((acceptedFiles: { map: (arg0: (file: any) => { file: any; status: string; }) => React.SetStateAction<FileWithStatus[]>; forEach: (arg0: (file: any) => void) => void; }) => {
    //     setFiles(acceptedFiles.map(file => ({ file, status: 'pending' })));
    //     acceptedFiles.forEach(file => {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         axios.post("your-upload-url", formData, {
    //             onUploadProgress: (progressEvent: AxiosProgressEvent) => {
    //                 const progress = progressEvent.total
    //                     ? (progressEvent.loaded / progressEvent.total) * 100
    //                     : 0;
    //                 setFiles(prevFiles => prevFiles.map(f => 
    //                     f.file.name === file.name ? { ...f, progress } : f
    //                 ));
    //             }
    //         })
    //         .then(() => {
    //             setFiles(prevFiles => prevFiles.map(f =>
    //                 f.file.name === file.name ? { ...f, status: 'success' } : f
    //             ));
    //         })
    //         .catch(() => {
    //             setFiles(prevFiles => prevFiles.map(f =>
    //                 f.file.name === file.name ? { ...f, status: 'error' } : f
    //             ));
    //         });
    //     });
    // }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            setFiles(acceptedFiles.map(file => ({ file, status: 'pending' as const })));
            acceptedFiles.forEach(file => {
                const formData = new FormData();
                formData.append("file", file);
                axios.post("http://localhost:3000/upload", formData, {
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
                })
                .catch(() => {
                    setFiles(prevFiles => prevFiles.map(f =>
                        f.file.name === file.name ? { ...f, status: 'error' as const } : f
                    ));
                });
            });
        }
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            {files.map(file => (
                <Box key={file.file.name}>
                    <Typography variant="body1">{file.file.name}</Typography>
                    {file.status === 'pending' && <LinearProgress variant="determinate" value={file.progress || 0} />}
                    {file.status === 'success' && <Typography color="green">Upload Successful</Typography>}
                    {file.status === 'error' && <Typography color="red">Upload Failed</Typography>}
                </Box>
            ))}
        </div>
    );
};

export default FileUpload;
