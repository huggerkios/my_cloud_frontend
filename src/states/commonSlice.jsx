import deleteFiles from "../api/deleteFiles";
import downloadLink from "../api/downloadLink";
import loadListFiles from "../api/loadListFiles";
import loadListUsers from "../api/loadListUsers";
import saverFile from "../utils/saverFile";

const useFileStore = (set, get) => ({
  files: {
    root: [],
  },
  folderTree: {
    root: {
      name: "Root",
    },
  },

  onLocation: null,
  clipboard: null,
  activeFile: null,
  showMenu: false,
  modal: { isShow: false },
  menuPosition: { x: 32, y: 32 },
  view: "list",
  newViewAdmin: "list",
  listUser: null,
  activeUser: null,

  setActiveUser: (user) => {
    set({ activeUser: user });
  },
  setListUser: async () => {
    const user = await loadListUsers();
    set({ listUser: user });
  },
  setView: (newViev) => {
    set({ view: newViev });
  },
  setViewAdmin: (newViewAdmin) => {
    set({ newViewAdmin: newViewAdmin });
  },
  setListFiles: (loadFile) => {
    set(() => {
      return { files: { root: [...loadFile] } };
    });
  },
  handle_menu: (e) => {
    e.preventDefault();
    const contextMenuHeight = get().onLocation.content.id === "root" ? 32 : 240;
    const adjustHeight = e.clientY - contextMenuHeight / 2;
    set(() => ({ menuPosition: { x: e.clientX + 32, y: adjustHeight } }));
    set(() => ({ showMenu: true }));
  },
  handle_close: () => {
    set({ showMenu: false });
  },
  handle_modal_close: () => {
    set({ modal: { isShow: false } });
  },
  handle_location: (obj = null) => {
    if (obj?.type === "file") {
      set({ activeFile: obj.content });
    } else {
      set({ activeFile: null });
    }
    set({ onLocation: obj });
  },

  handle_edit_action: async (actionKey, content) => {
    // Rename and Upload files
    if (actionKey.includes("rename") || actionKey.includes("upload")) {
      set(() => ({ modal: { isShow: true, type: actionKey } }));
      return;
    }

    // Delete files
    if (actionKey.includes("delete_file")) {
      await deleteFiles(content.id);

      const files = await loadListFiles();
      get().setListFiles(files.results);

      return;
    }
    if (actionKey.includes("download_file")) {
      await saverFile(content);

      const files = await loadListFiles();
      get().setListFiles(files.results);
      return;
    }
    if (actionKey.includes("copy_link_file")) {
      const { link } = await downloadLink(content.id);
      navigator.clipboard.writeText(link);
      return;
    }
    get()[actionKey]();
  },
});

export default useFileStore;
