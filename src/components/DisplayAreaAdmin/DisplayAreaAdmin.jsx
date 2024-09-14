import useBoundStore from "../../states/boundStore";
import "../DisplayArea/DisplayArea.css";
import DisplayViev from "../DisplayViev/DisplayViev";

import convertBytes from "../../utils/convertBytes";
import "./DisplayAreaAdmin.css";
import loadUpdateFiles from "../../api/loadUpdateFiles";
import userToAdmin from "../../api/userToAdmin";
import { TbHttpDelete } from "react-icons/tb";
import deleteUser from "../../api/deleteUser";

const DisplayAreaAdmin = () => {
  const allFiles = useBoundStore((state) => state.files);
  const view = useBoundStore((state) => state.view);

  const listUser = useBoundStore((state) => state.listUser);

  const handleUserClick = async (user) => {
    useBoundStore.getState().setActiveUser(user);
    await loadUpdateFiles(user.uuid);
    useBoundStore.getState().setViewAdmin("list");
  };

  const handleAdminChange = async (user) => {
    await userToAdmin(user);
    useBoundStore.getState().setListUser();
  };

  const handleDeleteUser = async (user) => {
    await deleteUser(user);
    useBoundStore.getState().setListUser();
  };
  return (
    <div className="displayAreaAdmin">
      <DisplayViev />
      {view === "grid" && (
        <div className="file-grid-admin" onClick={() => handleUserClick(user)}>
          {listUser?.results?.map((user) => (
            <div key={user.uuid} className="file-card-admin">
              <p>{user.username}</p>
            </div>
          ))}
        </div>
      )}

      {view === "list" && (
        <div className="file-list">
          <div className="file-row-admin header">
            <p className="file-name">{"Username"}</p>
            <p>{"Full name"}</p>
            <p>{"Email"}</p>
            <p>{"Files count"}</p>
            <p>{"Files size"}</p>
            <p>{"Is admin"}</p>
            <p>{"Delete"}</p>
          </div>
          {listUser?.results?.map((user) => (
            <div key={user.uuid} className="file-row-admin">
              <p className="file-name" onClick={() => handleUserClick(user)}>
                {user.username || "-"}
              </p>
              <p className="comment" onClick={() => handleUserClick(user)}>
                {user.full_name || "-"}
              </p>
              <p className="comment" onClick={() => handleUserClick(user)}>
                {user.email || "-"}
              </p>
              <p className="comment" onClick={() => handleUserClick(user)}>
                {user.files_count || "-"}
              </p>

              <p className="comment" onClick={() => handleUserClick(user)}>
                {convertBytes(user.files_size)}
              </p>
              <input
                type="checkbox"
                checked={user.is_admin}
                onChange={() => handleAdminChange(user)}
              />
              <div
                className="icons-wrapper"
                onClick={() => handleDeleteUser(user)}
              >
                <TbHttpDelete />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayAreaAdmin;
