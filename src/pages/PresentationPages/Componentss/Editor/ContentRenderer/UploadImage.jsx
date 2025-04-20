// import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
// import "@uploadcare/react-uploader/core.css";

const UploadImage = ({ contentId, onContentChange }) => {
  const handleChangeEvent = (e) => {
    onContentChange(contentId, e.cdnUrl);
  };

  return (
    <div>
      {/* <FileUploaderRegular
        sourceList="local, url, dropbox"
        classNameUploader="uc-light"
        pubkey={"91b9dd14df1918f3ead2"}
        multiple={false}
        onFileUploadSuccess={handleChangeEvent}
        maxLocalFileSizeBytes={10000000}
      /> */}
    </div>
  );
};

export default UploadImage;
