import { useDropzone } from 'react-dropzone';
import { LinearProgress, Box, Typography } from '@mui/material';
import logo from "../../logo.png";
import useFileUpload from '../../hooks/useFileUpload';

const Dropzone = () => {
    const { files, setFiles, uploadFile } = useFileUpload();

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

    return (
        <div {...getRootProps()}>
            <img width={100} src={logo} className="App-logo" alt="logo" />
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <Typography variant="body1">
                {files.filter(file => file.status === 'pending').length}/{files.length} uploading
            </Typography>
            {files.map(file => (
                <Box key={file.file.name}>
                    <Typography variant="body1">{file.file.name}</Typography>
                    <Typography variant="body1">{file.status}</Typography>
                    {file.status === 'pending' && (
                        <button onClick={() => {
                            setFiles(prevFiles => prevFiles.filter(f => f.file.name !== file.file.name));
                        }}>
                            Cancel
                        </button>
                    )}
                    {file.status === 'pending' && <LinearProgress variant="determinate" value={(file.progress ? file.progress - 5 : 0)} />}
                    {file.status === 'success' && <Typography color="green">Upload Successful</Typography>}
                    {file.status === 'error' && <Typography color="red">Upload Failed</Typography>}
                </Box>
            ))}
        </div>
    );
};

export default Dropzone;
