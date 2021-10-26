var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
var xulAppInfo = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo);

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
          } else {
            addressHeadersToolbar.removeAttribute("collapsed");
            addressHeadersToolbar.removeAttribute("persist");
            addressHeadersToolbar.setAttribute("style", "min-height: 8.6em;");
            if (xulAppInfo.OS == "WINNT") addressHeadersToolbar.setAttribute("style", "min-height: 9.3em;");
            addressHeadersToolbox.removeAttribute("style");
          }
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
      addressHeadersToolbar.removeAttribute("persist");
      addressHeadersToolbar.setAttribute("style", "min-height: 8.6em;");
      if (xulAppInfo.OS == "WINNT") addressHeadersToolbar.setAttribute("style", "min-height: 9.3em;");
      addressHeadersToolbox.removeAttribute("style");
    }
  }
};
