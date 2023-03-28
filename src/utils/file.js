export function generateFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // add 1 to account for 0-indexed months
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const fileName = `${year}${month}${day}${hour}${minute}${second}`;
  return fileName;
}
