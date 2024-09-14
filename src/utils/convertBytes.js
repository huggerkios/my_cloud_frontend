function convertBytes(sizeInBytes) {
  if (sizeInBytes === null) {
    return "-";
  } else if (sizeInBytes < 1024) {
    return `${sizeInBytes} bytes`;
  } else if (sizeInBytes < 1024 ** 2) {
    return `${(sizeInBytes / 1024).toFixed(2)} Kb`;
  } else {
    return `${(sizeInBytes / 1024 ** 2).toFixed(2)} Mb`;
  }
}
export default convertBytes;
