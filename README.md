
# React App Task: Multi-File Upload with Concurrent Handling

A simple React application that allows users to drag and drop multiple files into the UI and upload them concurrently.

## Requirement:

### UI/UX Requirement:
- Display a file list with the upload status for each file (e.g., uploading, success, failure)
- Display a section to allow users to drag and drop multiple files 

### Functional Requirement:
- Files ard uploaded concurrently (6 connection at the same time)
- using mock api with response time around 10-15s and 10% failed
- Tech stacks: ReactJS, MUI

### Non Functional Requirement:
- Clean and maintainable code
- A clear, well-explained choice for state management.
- Nice styling and responsiveness

### Out of scope
- Handle large/heavy file: >4gb.
- Handle exceed maximum connection of web brower: That a BIG problems as I research. 

### Addtional Requirement:
- Retried logic

### Solution explaination:
- useFileUpload: Using custom hook to handle api call process included retry and error logic
- useState: handle files data using useState, it simply to implement.
- Fileprogress component: Progress indicators UI
- Dropzone component: Dropzone container UI

### Project limitation:
- File size: 4Gb. That is limitation of multer - a library for backend. In case we handle large file, we need to change logic in backend side to chunking file processing. However, it's kind of out of scope.

- Connection: Max Number of default simultaneous persistent connections per server/proxy (Eg: Chrome is 6)


### How to Run 

- Clone repo 
- cd backend && npm i && npm start (it should run with port 3000)
- cd .. && cd frontend && yarn && yarn start (it should run with port 3001)






