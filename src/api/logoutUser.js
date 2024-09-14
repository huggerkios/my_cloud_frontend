import axios from "axios";
import Cookies from "js-cookie";

const logoutUser = async () => {
  const host = String(import.meta.env.VITE_HOST);
  const port = String(import.meta.env.VITE_PORT);

  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.post(
      `${host}:${port}/api/v1/auth/logout/`,
      {
        headers: { "X-CSRFToken": csrftoken },
      },
      { withCredentials: true, withXSRFToken: true }
    );
    Cookies.remove("csrftoken");
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export default logoutUser;
