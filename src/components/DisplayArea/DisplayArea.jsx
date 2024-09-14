import useBoundStore from "../../states/boundStore";
import "../DisplayArea/DisplayArea.css";
import DisplayViev from "../DisplayViev/DisplayViev";

import { TbFile, TbPdf, TbFileZip } from "react-icons/tb";
import convertBytes from "../../utils/convertBytes";

const DisplayArea = () => {
  const allFiles = useBoundStore((state) => state.files);
  const view = useBoundStore((state) => state.view);

  const handleTypeFile = (type) => {
    const clearType = type.split("/")[1];

    switch (clearType) {
      case "pdf":
        return <TbPdf />;
      case "x-zip-compressed":
        return <TbFileZip />;

      default:
        return <TbFile />;
    }
  };
  return (
    <div className="display-area">
      <DisplayViev />
      {view === "grid" && (
        <div className="file-grid">
          {allFiles?.root?.map((file) => (
            <div key={file.uuid} className="file-card">
              <div className="icons-wrapper">{handleTypeFile(file.type)}</div>
              <p className="file-name">{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {view === "list" && (
        <div className="file-list">
          <div className="file-row header">
            <p className="file-name">{"Name"}</p>
            <p>{"Comment"}</p>
            <p>{"Size"}</p>
            <p>{"Uploaded at"}</p>
            <p>{"Last download"}</p>
          </div>
          {allFiles?.root?.map((file) => (
            <div key={file.uuid} className="file-row">
              <p className="file-name">{file.name}</p>
              <p className="comment">{file.comment}</p>
              <p>{convertBytes(file.size)}</p>
              <p>{file.uploaded_at}</p>
              <p>{file.last_download}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayArea;
