import PropTypes from 'prop-types';
import '../FolderItem/FolderItem.css';
import { AiOutlineDown } from "react-icons/ai";
import { useState } from 'react';
import FileItem from '../FileItem/FileItem'

const FolderItem = ({ folderName, folderID }) => {

    const [isOpen, setIsOpen] = useState(false);
    const iconDeg = isOpen ? null : { transform: 'rotate(-90deg)' };


    return (
        <div className={`folder-container ${isOpen ? 'open' : ''}`}>
            <h3 className="folder-title" onClick={() => setIsOpen(!isOpen)} data-folder={folderID} data-name={folderName}>
                <span className="icon-box">
                    <AiOutlineDown style={iconDeg} />
                </span>
                {folderName}
            </h3>
            <FileItem folder={folderID} />
        </div>
    )
}

FolderItem.propTypes = {
    folderName: PropTypes.string.isRequired,
    folderID: PropTypes.string.isRequired,
}

export default FolderItem