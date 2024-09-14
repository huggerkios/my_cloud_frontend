import Cookies from "js-cookie";
import axios from "axios";

async function loadListFiles(uuid) {
  const host = String(import.meta.env.VITE_HOST);
  const port = String(import.meta.env.VITE_PORT);

  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.get(`${host}:${port}/api/v1/cloud/files/`, {
      headers: {
        "X-CSRFToken": csrftoken,
      },
      withCredentials: true,
      withXSRFToken: true,
      params: { uuid: uuid },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default loadListFiles;
