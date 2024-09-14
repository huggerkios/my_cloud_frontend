import React, { useEffect } from "react";
import FileArea from "../../components/FileArea/FileArea";
import DisplayArea from "../../components/DisplayArea/DisplayArea";
import Modal from "../../components/Modal/Modal";
import EditMenu from "../../components/EditMenu/EditMenu";
import useBoundStore from "../../states/boundStore";
import loadUpdateFiles from "../../api/loadUpdateFiles";

import s from "./Dashboard.module.css";
import FileAreaAdmin from "../../components/FileAreaAdmin/FileAreaAdmin";
import DisplayAreaAdmin from "../../components/DisplayAreaAdmin/DisplayAreaAdmin";

const Dashboard = () => {
  const isModal = useBoundStore((state) => state.modal.isShow);
  const showEditMenu = useBoundStore((state) => state.showMenu);
  const isAdmin = useBoundStore((state) => state.accessAdmin);
  const viewAdmin = useBoundStore((state) => state.newViewAdmin);

  useEffect(() => {
    useBoundStore.getState().accessCheck();
    useBoundStore.getState().setListUser();
  }, []);
  useEffect(() => {
    async function fetchData() {
      await loadUpdateFiles();
    }
    fetchData();
  }, []);

  return (
    <div className={s.dashboard}>
      {!isAdmin && <FileArea />}
      {isAdmin && <FileAreaAdmin />}

      {(!isAdmin || viewAdmin === "list") && <DisplayArea />}

      {isAdmin && viewAdmin === "users" && <DisplayAreaAdmin />}

      {showEditMenu && <EditMenu />}
      {isModal && <Modal />}
    </div>
  );
};

export default Dashboard;
