import React, { useState } from "react";
import { TbArticle, TbLayoutGrid } from "react-icons/tb";

import s from "./DisplayViev.module.css";
import useBoundStore from "../../states/boundStore";

const DisplayViev = () => {
  const view = useBoundStore((state) => state.view);

  const handleIconClick = (newView) => {
    useBoundStore.getState().setView(newView);
  };
  return (
    <div className={s.displayViev}>
      <TbArticle
        className={`${s.icon} ${view === "list" ? s.active : s.inactive}`}
        onClick={() => handleIconClick("list")}
      />
      <TbLayoutGrid
        className={`${s.icon} ${view === "grid" ? s.active : s.inactive}`}
        onClick={() => handleIconClick("grid")}
      />
    </div>
  );
};

export default DisplayViev;
