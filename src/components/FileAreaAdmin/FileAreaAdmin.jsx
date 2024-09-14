import useBoundStore from "../../states/boundStore";
import FolderItem from "../FolderItem/FolderItem";
import { useNavigate } from "react-router-dom";
import logoutUser from "../../api/logoutUser";

import s from "./FileAreaAdmin.module.css";
import DisplayVievAdminPanel from "../DisplayVievAdminPanel/DisplayVievAdminPanel";
import UserBoard from "../UserBoard/UserBoard";

const FileAreaAdmin = () => {
  const folderTree = useBoundStore((state) => state.folderTree);
  const closeMenu = useBoundStore((state) => state.handle_close);
  const callMenu = useBoundStore((state) => state.handle_menu);
  const updateLocation = useBoundStore((state) => state.handle_location);

  const logoutUserState = useBoundStore((state) => state.logoutUser);
  const view = useBoundStore((state) => state.newViewAdmin);
  const activeUser = useBoundStore((state) => state.activeUser);

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
        {view === "list" ? (
          <h1 className={s.fileAreaTitle}>File Management</h1>
        ) : (
          <h1 className={s.fileAreaTitle}>Users Management</h1>
        )}
        <div className={s.adminModeArea}>
          <p className={s.adminMode}>Admin Mode</p>
          <DisplayVievAdminPanel />
        </div>

        {view === "list" && (
          <>
            {activeUser ? (
              <p className={s.fileInfoTitle}>
                File Storage for - {activeUser.username}
              </p>
            ) : (
              <p className={s.fileInfoTitle}>All files in the server</p>
            )}

            <p>Edit folders and files by right click on the target item.</p>
            {loopingThroughObject(folderTree)}
          </>
        )}
        {view === "users" && <UserBoard />}
      </div>

      <button onClick={handleClickLogout}>Logout</button>
    </div>
  );
};

export default FileAreaAdmin;
