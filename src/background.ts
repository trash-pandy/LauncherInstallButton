import browser from "webextension-polyfill";

browser.action.onClicked.addListener(async (event) => {
  if (event.url == undefined) return;

  let url = new URL(event.url);
  let hostname = url.hostname.split(".");
  if (hostname.at(-2) !== "modrinth" || hostname.at(-1) !== "com") {
    return;
  }

  let path = url.pathname.split("/").filter((s) => s.length !== 0);
  if (!path[0].endsWith("s") && path[1] !== undefined) {
    window.location.assign(`modrinth-mc://${path[0]}/${path[1]}`);
  }
});
