import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import styles from './styles.module.scss'; // Import the SCSS file
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/VideoFile';
import { TFileStatus } from '../../hooks/useFileUpload';

interface FileProgressProps {
  fileName: string;
  status: TFileStatus;
  progress: number;
}

const FileProgress: React.FC<FileProgressProps> = ({ fileName, status, progress }) => {

    const getStatusColor = (status: TFileStatus) => {
        switch (status) {
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            case 'pending':
                return 'blue';
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

    const getFileIcon = (fileName: string) => {
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        switch (fileExtension) {
            case 'pdf':
                return <PictureAsPdfIcon className={styles.fileIcon} fontSize='large' />;
            case 'doc':
            case 'docx':
                return <ArticleIcon className={styles.fileIcon} fontSize='large' />;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return <ImageIcon className={styles.fileIcon} fontSize='large' />;
            case 'mp4':
                return <VideoIcon className={styles.fileIcon} fontSize='large' />;
            default:
                return <InsertDriveFileIcon className={styles.fileIcon} fontSize='large' />;
        }
    }
    

  return (
    <Box className={styles.fileProgressContainer}>
      <Box className={styles.fileInfo}>
        {getFileIcon(fileName)}
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

      {status !== 'success' && (
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
            {`${status === 'pending' ? Math.min(Math.round(progress), 99) : Math.round(progress)}%`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileProgress;
