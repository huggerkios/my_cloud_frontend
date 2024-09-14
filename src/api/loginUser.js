import axios from "axios";
import useBoundStore from "../states/boundStore";

const loginUser = async (username, password) => {
  const host = String(import.meta.env.VITE_HOST);
  const port = String(import.meta.env.VITE_PORT);

  try {
    const response = await axios.post(
      `${host}:${port}/api/v1/auth/login/`,
      {
        username,
        password,
      },
      { withCredentials: true, withXSRFToken: true }
    );

    await useBoundStore.getState().accessCheck();
    await useBoundStore.getState().accsessCheckAdmin(response.data.is_admin);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export default loginUser;
