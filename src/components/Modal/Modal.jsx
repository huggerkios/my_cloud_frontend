import "../Modal/Modal.css";
import useBoundStore from "../../states/boundStore";
import { useState } from "react";

import uploadFile from "../../api/uploadFile";
import renameFile from "../../api/renameFile"; 
import loadUpdateFiles from "../../api/loadUpdateFiles";

const Modal = () => {
  const { type } = useBoundStore((state) => state.modal);
  const performItem = useBoundStore((state) => state.onLocation);
  const closeModal = useBoundStore((state) => state.handle_modal_close);
  const activeFile = useBoundStore((state) => state.activeFile);
  // File Upload

  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState("");
  const [rename, setRename] = useState(performItem.content.name);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFiles([file]);
  };
  const handleCommentChange = (event) => {
    const comments = event.target.value;
    setComment(comments);
  };
  const handleRenameChange = (event) => {
    const renameData = event.target.value;
    setRename(renameData);
  };

  const handleClose = (e) => {
    const { classList } = e.target;
    if (classList.contains("modal-backdrop")) {
      closeModal();
    }
  };
  const handleUploadFile = async (e) => {
    const fileInput = e.target.elements.fileName;
    const file = fileInput.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    closeModal();

    await uploadFile(file, comment);
    await loadUpdateFiles();
  };

  const handleRename = async () => {
    try {
      closeModal();
 
      await renameFile(rename, comment, activeFile.id);
      await loadUpdateFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const renderModalForm = () => {
    if (type.includes("rename")) {
      return (
        <>
          <p className="modal-title">Rename {performItem.type} name</p>
          <form className="formControl" onSubmit={handleRename}>
            <label htmlFor="fileName">{performItem.type} name</label>
            <input
              type="text"
              id="fileRenameName"
              name="file-name"
              onChange={handleRenameChange}
              value={rename}
              required
            />
            <label htmlFor="fileComment"> Comment file </label>
            <input
              id="fileComment"
              name="file-Comment"
              type="text"
              onChange={handleCommentChange}
            />
            <button type="submit">Save</button>
          </form>
        </>
      );
    } else if (type.includes("upload_file")) {
      return (
        <>
          <p className="modal-title">Upload file</p>
          <form className="formControl" onSubmit={handleUploadFile}>
            <input
              id="fileName"
              name="file-name"
              type="file"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="fileName" className="custom-file-input">
              Select file ...
            </label>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <label htmlFor="fileComment"> Comment file </label>
            <input
              id="fileComment"
              name="file-Comment"
              type="text"
              onChange={handleCommentChange}
            />

            <button type="submit">Add</button>
          </form>
        </>
      );
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => handleClose(e)}>
      <div className="modal-container">{renderModalForm()}</div>
    </div>
  );
};

export default Modal;
