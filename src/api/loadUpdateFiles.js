import useBoundStore from "../states/boundStore";
import loadListFiles from "./loadListFiles";

const loadUpdateFiles = async (uuid) => {
  try {
    const files = await loadListFiles(uuid);
    useBoundStore.getState().setListFiles(files.results);
  } catch (error) {
    console.error(error);
  }
};

export default loadUpdateFiles;
