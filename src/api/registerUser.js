import axios from "axios";
import useBoundStore from "../states/boundStore";

const registerUser = async (username, full_name, email, password) => {
  const host = String(import.meta.env.VITE_HOST);
  const port = String(import.meta.env.VITE_PORT);
  try {
    const response = await axios.post(
      `${host}:${port}/api/v1/auth/registration/`,
      {
        username,
        full_name,
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export default registerUser;
