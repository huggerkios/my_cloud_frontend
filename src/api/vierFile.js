import Cookies from "js-cookie";
import axios from "axios";

async function vierFile(uuid) {
  const base_url = import.meta.env.VITE_BASE_URL;

  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.get(
      `${base_url}/api/v1/cloud/files/${uuid}/`,
      {
        headers: {
          "X-CSRFToken": csrftoken,
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

export default vierFile;
