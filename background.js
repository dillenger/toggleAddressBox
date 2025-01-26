function clickAction() {
  browser.toggleAddressBoxApi.toggleAddressBox();
}
browser.composeAction.onClicked.addListener(clickAction);
