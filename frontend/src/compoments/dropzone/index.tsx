import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';
import useFileUpload from '../../hooks/useFileUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import styles from './styles.module.scss';  // Import the module.scss file
import FileProgress from '../fileprogress';
import React, { useCallback } from 'react';

const Dropzone = () => {
    const { files, setFiles, uploadFile } = useFileUpload();

    const handleDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => ({ file, status: 'pending' as const })));
        const uploadPromises = acceptedFiles.map(file => uploadFile(file));
        Promise.all(uploadPromises)
            .then(() => {
                console.log("All uploads completed!");
            })
            .catch((err) => {
                console.error("Some uploads failed:", err);
            });
    }, [setFiles, uploadFile]);
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop
    });

    return (
        <div {...getRootProps()}>

            <Box className={styles.uploadContainer}>
                <Box component="h3" className={styles.uploadTitle}>
                    Upload photos
                </Box>
                <Box component="p" className={styles.uploadNote}>
                    Drag or choose your file to upload
                </Box>

                <Box className={styles.uploadFile}>
                    <input
                      {...getInputProps()} 
                        className={styles.fileInput}
                        type="file"
                    />
                        <>
                            <UploadFileIcon fontSize='large' className={styles.uploadIcon} />
                            <Box component="p" className={styles.uploadFormat}>
                                PNG, GIF, WEBP, MP4, PDF, DOCX, XLSX. Max 5000Mb.
                            </Box>
                        </>
                </Box>
            </Box>

            <Box className={styles.scrollContainer}>
                <Box>
                    {files.some(file => file.status === 'pending') && (
                        <Box component="h4" className={styles.uploadTitle}>
                            Uploading files
                        </Box>
                    )}
                    {files.filter(file => file.status === 'pending').map(file => (
                        <Box key={file.file.name}>
                            <FileProgress fileName={file.file.name} status={file.status} progress={file.progress ? file.progress : 1} />
                        </Box>
                    ))}
                </Box>
                <Box>
                    {files.filter(file => file.status !== 'pending').length > 0 && (
                        <Box component="h4" className={styles.uploadTitle}>
                            Uploaded files
                        </Box>
                    )}
                    {files.filter(file => file.status !== 'pending').map(file => (
                        <Box key={file.file.name}>
                            <FileProgress fileName={file.file.name} status={file.status} progress={file.progress ? file.progress : 1} />
                        </Box>
                    ))}
                </Box>
               
            </Box>
        </div>
    );
};

export default React.memo(Dropzone);
