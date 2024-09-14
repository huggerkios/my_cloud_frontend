import React from "react";
import { TbUsers, TbFiles } from "react-icons/tb";

import s from "./DisplayVievAdminPanel.module.css";
import useBoundStore from "../../states/boundStore";
import loadUpdateFiles from "../../api/loadUpdateFiles";

const DisplayVievAdminPanel = () => {
  const view = useBoundStore((state) => state.newViewAdmin);

  
  const handleIconClick = (newViewAdmin) => {
    useBoundStore.getState().setViewAdmin(newViewAdmin);
    if (newViewAdmin === "list") {
      loadUpdateFiles();
    } else {
      useBoundStore.getState().setListUser();
      useBoundStore.getState().setListFiles([]);
      useBoundStore.getState().setActiveUser(null);
    }
  };
  return (
    <div className={s.displayViev}>
      <TbUsers
        className={`${s.icon} ${view === "users" ? s.active : s.inactive}`}
        onClick={() => handleIconClick("users")}
      />
      <TbFiles
        className={`${s.icon} ${view === "list" ? s.active : s.inactive}`}
        onClick={() => handleIconClick("list")}
      />
    </div>
  );
};

export default DisplayVievAdminPanel;
