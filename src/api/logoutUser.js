import axios from "axios";
import Cookies from "js-cookie";

const logoutUser = async () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.post(
      `${base_url}/api/v1/auth/logout/`,
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
