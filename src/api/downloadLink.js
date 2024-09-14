import Cookies from "js-cookie";
import axios from "axios";

async function downloadLink(uuid) {
  const host = String(import.meta.env.VITE_HOST);
  const port = String(import.meta.env.VITE_PORT);

  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.get(
      `${host}:${port}/api/v1/cloud/files/${uuid}/download-link/`,
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

export default downloadLink;
