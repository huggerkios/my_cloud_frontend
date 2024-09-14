import useBoundStore from "../../states/boundStore";
import FolderItem from "../FolderItem/FolderItem";
import s from "./FileArea.module.css";
import { useNavigate } from "react-router-dom";
import logoutUser from "../../api/logoutUser";
const FileArea = () => {
  const folderTree = useBoundStore((state) => state.folderTree);
  const closeMenu = useBoundStore((state) => state.handle_close);
  const callMenu = useBoundStore((state) => state.handle_menu);
  const updateLocation = useBoundStore((state) => state.handle_location);

  const logoutUserState = useBoundStore((state) => state.logoutUser);

  const navigate = useNavigate();
  const loopingThroughObject = (obj) => {
    if (!obj) return;
    return Object.keys(obj).map((key) => {
      let folder = obj[key];
      return (
        <div key={key}>
          <FolderItem folderName={folder.name} folderID={key} />
        </div>
      );
    });
  };

  const handleClickLogout = () => {
    logoutUser();
    logoutUserState();

    navigate("/", { replace: true });
  };

  const handleClick = (e) => {
    const { classList, dataset } = e.target;
    if (classList.contains("folder-title")) {
      updateLocation({
        type: "folder",
        content: { id: dataset.folder, name: dataset.name },
      });
      return;
    } else if (classList.contains("file-item")) {
      updateLocation({
        type: "file",
        content: { id: dataset.file, parent: dataset.parent },
      });

      return;
    } else closeMenu();
  };

  const handleContext = (e) => {
    e.preventDefault();
    const { classList, dataset } = e.target;
    if (classList.contains("folder-title")) {
      updateLocation({
        type: "folder",
        content: { id: dataset.folder, name: dataset.name },
      });
      callMenu(e);
      return;
    }
    if (classList.contains("file-item")) {
      updateLocation({
        type: "file",
        content: {
          id: dataset.file,
          name: dataset.name,
          parent: dataset.parent,
        },
      });
      callMenu(e);
      return;
    }
  };

  return (
    <div
      className={s.fileAreaWrapper}
      onClick={(e) => handleClick(e)}
      onContextMenu={(e) => handleContext(e)}
    >
      <div className={s.fileArea}>
        <h1 style={{ fontSize: "2rem" }}>File Management</h1>
        <p>Edit folders and files by right click on the target item.</p>
        {loopingThroughObject(folderTree)}
      </div>

      <button onClick={handleClickLogout}>Logout</button>
    </div>
  );
};

export default FileArea;
