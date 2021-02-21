console.log("Hello tlg!");

document.querySelector("#send_to_file").addEventListener("click", () => {
  console.log("send_to_file");
  let msgElement = document.querySelector("#msg");
  if (msgElement) {
    fetch("/api_send2file?msg=" + msgElement.value).then((response) => {});
  }
});

document.querySelector("#send_to_telegram").addEventListener("click", () => {
  console.log("#send_to_telegram");
});
