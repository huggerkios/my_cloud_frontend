import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

async function deleteFiles(id) {
  const base_url = import.meta.env.VITE_BASE_URL;

  const csrftoken = Cookies.get("csrftoken");

  try {
    await axios.delete(`${base_url}/api/v1/cloud/files/${id}/`, {
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

export default deleteFiles;
