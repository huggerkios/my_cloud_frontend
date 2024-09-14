import React from "react";
import useBoundStore from "../../states/boundStore";
import s from "./UserBoard.module.css";
const UserBoard = () => {
  const listUser = useBoundStore((state) => state.listUser);
  const activeUser = useBoundStore((state) => state.activeUser);

  return (
    <div className={s.userBoard}>
      <div className={s.userBoardTitle}>All users: {listUser?.count}</div>
      {/* <div className={s.userBoardList}>
        {listUser.results.map((user) => (
          <div
            className={`${s.userBoardItem} ${
              user.uuid === activeUser?.uuid ? s.active : ""
            }`}
            key={user.uuid}
            onClick={() => {
              useBoundStore.getState().setActiveUser(user);
            }}
          >
            {user.username}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default UserBoard;
