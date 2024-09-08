import { useDropzone } from 'react-dropzone';
import { LinearProgress, Box, Typography, Button, IconButton } from '@mui/material';
import useFileUpload from '../../hooks/useFileUpload';
import { useState, ChangeEvent } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles.module.scss';  // Import the module.scss file
import FileProgress from '../fileprogress';

const Dropzone = () => {
    const { files, setFiles, uploadFile } = useFileUpload();
    const [selectedImage, setSelectedImage] = useState(null);
    const handleDrop = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => ({ file, status: 'pending' as const })));
        const uploadPromises = acceptedFiles.map(file => uploadFile(file));
        Promise.all(uploadPromises)
            .then(() => {
                console.log("All uploads completed!");
            })
            .catch((err) => {
                console.error("Some uploads failed:", err);
            });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    setSelectedImage(e.target.result as any);
                }
            };
            reader.readAsDataURL(file);
        }
    }

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
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {selectedImage ? (
                        <>
                            <Box component="img" src={selectedImage} alt="Selected" className={styles.previewSelectedImage} />
                            <IconButton className={styles.removeButton} onClick={() => setSelectedImage(null)}>
                                <CloseIcon className={styles.removeIcon} />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <UploadFileIcon className={styles.uploadIcon} />
                            <Box component="p" className={styles.uploadFormat}>
                                PNG, GIF, WEBP, MP4. Max 500Mb.
                            </Box>
                        </>
                    )}
                </Box>
            </Box>

            <Box className={styles.scrollContainer}>
                {files.map(file => (
                    <Box key={file.file.name}>
                        <FileProgress fileName={file.file.name} status={file.status} progress={file.progress ? file.progress : 0} />
                    </Box>
                ))}
            </Box>
        </div>
    );
};

export default Dropzone;
