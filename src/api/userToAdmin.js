import Cookies from "js-cookie";
import axios from "axios";

async function userToAdmin(user) {
  const base_url = import.meta.env.VITE_BASE_URL;

  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.post(
      `${base_url}/api/v1/users/${user.username}/admin-set/`,
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
