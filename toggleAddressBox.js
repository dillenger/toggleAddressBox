function clickAction() {
  browser.toggleAddressBoxApi.toggleAddressBox();
  let gettingBadgeText = browser.composeAction.getBadgeText({});
  gettingBadgeText.then(gotBadgeText);
}

function gotBadgeText(text) {
  if (text == "Show") browser.composeAction.setBadgeText({text: ""});
  else browser.composeAction.setBadgeText({text: "Show"});
}

browser.composeAction.onClicked.addListener(clickAction);
