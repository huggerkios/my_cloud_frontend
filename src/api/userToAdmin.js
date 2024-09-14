import Cookies from "js-cookie";
import axios from "axios";

async function userToAdmin(user) {
  const host = String(import.meta.env.VITE_HOST);
  const port = String(import.meta.env.VITE_PORT);

  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.post(
      `${host}:${port}/api/v1/users/${user.username}/admin-set/`,
      { is_admin: user.username },
      {
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        withXSRFToken: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default userToAdmin;
