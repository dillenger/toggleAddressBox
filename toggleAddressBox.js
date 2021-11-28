function clickAction() {
  browser.toggleAddressBoxApi.toggleAddressBox();
  let gettingBadgeText = browser.composeAction.getBadgeText({});
  gettingBadgeText.then(gotBadgeText);
}

function gotBadgeText(text) {
  if (text == "show") browser.composeAction.setBadgeText({text: ""});
  else browser.composeAction.setBadgeText({text: "show"});
}

browser.composeAction.onClicked.addListener(clickAction);
