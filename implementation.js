var { ExtensionCommon } = ChromeUtils.importESModule("resource://gre/modules/ExtensionCommon.sys.mjs");

var toggleAddressBoxApi = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      toggleAddressBoxApi: {
        async toggleAddressBox() {
          let recentWindow = Services.wm.getMostRecentWindow("msgcompose");
          let MsgHeadersToolbar = recentWindow.document.getElementById("MsgHeadersToolbar");
          // reset the message header height when resized by dragging the splitter
          let composeContentBox = recentWindow.document.getElementById("composeContentBox");
          if (composeContentBox) composeContentBox.setAttribute("style", "--contactsSplitter-width: auto; --headersSplitter-height: auto;");
          // toggle the contacts sidebar twice as a workaround to maintain its width
          recentWindow.toggleContactsSidebar();
          recentWindow.toggleContactsSidebar();
          if (MsgHeadersToolbar.getAttribute("collapsed") != "true") {
            MsgHeadersToolbar.setAttribute("collapsed", "true");
            MsgHeadersToolbar.setAttribute("style", "display: none;");
          } else {
            MsgHeadersToolbar.removeAttribute("collapsed");
            MsgHeadersToolbar.setAttribute("style", "min-height: 115px;");
          }
          recentWindow.addEventListener("unload", function(event) {
            MsgHeadersToolbar.removeAttribute("collapsed");
            MsgHeadersToolbar.setAttribute("style", "min-height: 115px;");
          });
        },
      },
    };
  }

  onShutdown(isAppShutdown) {
  if (isAppShutdown) return;
    for (let window of Services.wm.getEnumerator("msgcompose")) {
      let MsgHeadersToolbar = window.document.getElementById("MsgHeadersToolbar");
      MsgHeadersToolbar.removeAttribute("collapsed");
      MsgHeadersToolbar.setAttribute("style", "min-height: 115px;");
    }
  }
};
