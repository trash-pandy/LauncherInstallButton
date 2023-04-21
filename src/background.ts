import browser from "webextension-polyfill";

(async function () {
  for (let tab of await browser.tabs.query({})) {
    if (tab.url !== undefined) {
      let hostname = new URL(tab.url).hostname.split(".");
      if (hostname.at(-2) !== "modrinth" || hostname.at(-1) !== "com") {
        browser.action.disable(tab.id);
      } else {
        browser.action.enable(tab.id);
      }
    } else {
      browser.action.disable(tab.id);
    }
  }
})();

browser.tabs.onActivated.addListener(async (e) => {
  let tab = await browser.tabs.get(e.tabId);
  if (tab.url !== undefined) {
    let hostname = new URL(tab.url).hostname.split(".");
    if (hostname.at(-2) !== "modrinth" || hostname.at(-1) !== "com") {
      browser.action.disable(tab.id);
    } else {
      browser.action.enable(tab.id);
    }
  }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let url = changeInfo.url ?? tab.url ?? undefined;
  if (url !== undefined) {
    let hostname = new URL(url).hostname.split(".");
    if (hostname.at(-2) !== "modrinth" || hostname.at(-1) !== "com") {
      browser.action.disable(tab.id);
    } else {
      browser.action.enable(tab.id);
    }
  }
});

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
