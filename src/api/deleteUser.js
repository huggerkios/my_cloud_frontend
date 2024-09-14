import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

async function deleteUser(user) {
  const host = String(import.meta.env.VITE_HOST);
  const port = String(import.meta.env.VITE_PORT);
  const csrftoken = Cookies.get("csrftoken");

  try {
    await axios.delete(`${host}:${port}/api/v1/users/${user.username}/`, {
      headers: {
        "X-CSRFToken": csrftoken,
      },
      withCredentials: true,
      withXSRFToken: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export default deleteUser;
