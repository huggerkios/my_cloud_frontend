import downloadData from "../api/downloadData"; 
import { saveAs } from "file-saver";

async function saverFile(content) {
  try {
 

    const vierFiles = await downloadData(content.id);

    saveAs(vierFiles.link, vierFiles.name, {
      type: `${vierFiles.type};charset=utf-8`,
    });
	
  } catch (error) {
    console.error("Error downloading file:", error);
    // Обработка ошибки, например, отображение сообщения пользователю
  }
}
export default saverFile;
