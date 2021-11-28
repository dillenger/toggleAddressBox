var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

var toggleAddressBoxApi = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      toggleAddressBoxApi: {
        async toggleAddressBox() {
          let recentWindow = Services.wm.getMostRecentWindow("msgcompose");
          let addressHeadersToolbar = recentWindow.document.getElementById("MsgHeadersToolbar");
          let addressHeadersToolbox = recentWindow.document.getElementById("headers-box");
          if (addressHeadersToolbar.getAttribute("collapsed") != "true") {
            addressHeadersToolbar.setAttribute("collapsed", "true");
            addressHeadersToolbox.setAttribute("style", "max-height: 0px;");
            console.log("collapsed");
          } else {
            addressHeadersToolbar.removeAttribute("collapsed");
            addressHeadersToolbar.setAttribute("style", "min-height: 115px;");
            addressHeadersToolbox.removeAttribute("style");
            console.log("expanded");
          }
          recentWindow.addEventListener("unload", function(event) {
            addressHeadersToolbar.removeAttribute("collapsed");
            addressHeadersToolbar.setAttribute("style", "min-height: 115px;");
            addressHeadersToolbox.removeAttribute("style");
            console.log("unloaded");
          });
        },
      },
    };
  }

  onShutdown(isAppShutdown) {
  if (isAppShutdown) return;
    for (let window of Services.wm.getEnumerator("msgcompose")) {
      let addressHeadersToolbar = window.document.getElementById("MsgHeadersToolbar");
      let addressHeadersToolbox = window.document.getElementById("headers-box");
      addressHeadersToolbar.removeAttribute("collapsed");
      addressHeadersToolbar.setAttribute("style", "min-height: 115px;");
      addressHeadersToolbox.removeAttribute("style");
    }
  }
};
