import PropTypes from "prop-types";
import "../FileItem/FileItem.css";
import useBoundStore from "../../states/boundStore";

const FileItem = ({ folder }) => {
  const filesData = useBoundStore((state) => state.files);

  if (filesData[folder] && filesData[folder].length !== 0) {
    return (
      <ul>
        {filesData[folder].map((file) => (
          <li
            className="file-item"
            key={file.uuid}
            data-file={file.uuid}
            data-name={file.name}
            data-parent={folder}
          >
            {file.name} 
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>Start adding some files.</p>;
  }
};

FileItem.propTypes = {
  folder: PropTypes.string,
};

export default FileItem;
