import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import commonSlice from "./commonSlice"; 
import authSlice from "./authSlice";

const useBoundStore = create(
  persist(
    (set, get) => ({
      ...commonSlice(set, get), 
      ...authSlice(set, get),
    }),
    {
      name: "file-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useBoundStore;
