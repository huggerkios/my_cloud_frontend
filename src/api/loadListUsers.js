import Cookies from "js-cookie";
import axios from "axios";

async function loadListUsers() {
  const base_url = import.meta.env.VITE_BASE_URL;

  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.get(`${base_url}/api/v1/users/`, {
      headers: {
        "X-CSRFToken": csrftoken,
      },
      withCredentials: true,
      withXSRFToken: true,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default loadListUsers;
