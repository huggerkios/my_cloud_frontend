import axios from "axios";
import useBoundStore from "../states/boundStore";

const registerUser = async (username, full_name, email, password) => {
  const base_url = import.meta.env.VITE_BASE_URL;

  try {
    const response = await axios.post(
      `${base_url}/api/v1/auth/registration/`,
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
