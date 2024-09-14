import Cookies from "js-cookie";
import axios from "axios";

async function renameFile(rename, comment, id) {
  const host = String(import.meta.env.VITE_HOST);
  const port = String(import.meta.env.VITE_PORT);
  const csrftoken = Cookies.get("csrftoken");

  const formData = new FormData();
  formData.append("name", rename);
  comment && formData.append("comment", comment);
 
  try {
    const response = await axios.patch(
      `${host}:${port}/api/v1/cloud/files/${id}/`,
      formData,
      {
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "multipart/form-data",
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

export default renameFile;
