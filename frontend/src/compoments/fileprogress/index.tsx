import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import styles from './styles.module.scss'; // Import the SCSS file

interface FileProgressProps {
  fileName: string;
  status: string;
  progress: number;
}

const FileProgress: React.FC<FileProgressProps> = ({ fileName, status, progress }) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            default:
                return 'inherit';
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'success':
                return 'Upload Successful';
            case 'error':
                return 'Upload Failed';
            default:
                return 'Uploading...';
        }
    }

  return (
    <Box className={styles.fileProgressContainer}>
      <Box className={styles.fileInfo}>
        <InsertDriveFileIcon className={styles.fileIcon} />
        <Box>
          <Typography className={styles.fileName}>{fileName}</Typography>
          <Typography 
            className={styles.fileStatus} 
            style={{ color: getStatusColor(status) }}
          >
            {getStatusText(status)}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.progressContainer}>
        <LinearProgress
          variant="determinate"
          value={Math.round(progress)}
          className={styles.progressBar}
        />
        <Typography 
          className={styles.progressPercentage} 
          style={{ color: getStatusColor(status) }}
        >
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default FileProgress;
