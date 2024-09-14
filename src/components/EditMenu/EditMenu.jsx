import "../EditMenu/EditMenu.css";
import useBoundStore from "../../states/boundStore";
import { fileActions, rootActions } from "./availableActions"; 
import loadUpdateFiles from "../../api/loadUpdateFiles";

const EditMenu = () => {
  const { type, content } = useBoundStore((state) => state.onLocation) ?? {
    content: { id: "root" },
  };
  const clipboard = useBoundStore((state) => state.clipboard);
  const onClose = useBoundStore((state) => state.handle_close);
  const menuPosition = useBoundStore((state) => state.menuPosition);
  const callEditAction = useBoundStore((state) => state.handle_edit_action);

  const renderMenuItems = () => {
    if (content.id === "root") {
      return rootActions.map((item, i) => (
        <div
          className="menu-item"
          key={i}
          onClick={() => handleClick(item.action_key)}
        >
          {item.name}
        </div>
      ));
    } else {
      return fileActions.map((item, i) => {
        return (
          <div
            className="menu-item"
            key={i}
            onClick={() => handleClick(item.action_key)}
          >
            {item.name}
          </div>
        );
      });
    }
  };

  const renderPasteConditionally = () => {
    // Only render paste option when action is performed on a folder
    if (clipboard?.type === "folder" && type === "folder") {
      return (
        <div className="menu-item" onClick={() => handleClick("paste_folder")}>
          Paste Folder {`'${clipboard.content.name}'`}
        </div>
      );
    }
    if (clipboard?.type === "file" && type === "folder") {
      return (
        <div className="menu-item" onClick={() => handleClick("paste_file")}>
          Paste File{" "}
          {`'${clipboard.content.name}.${clipboard.content.extension}'`}
        </div>
      );
    }
  };

  const handleClick = async (actionKey) => {
    callEditAction(actionKey, content);
    await loadUpdateFiles();

    onClose();
  };

  return (
    <div
      className="edit-menu"
      style={{
        position: "absolute",
        top: menuPosition.y,
        left: menuPosition.x,
        zIndex: 5,
      }}
    >
      {renderPasteConditionally()}
      {renderMenuItems()}
    </div>
  );
};

export default EditMenu;
