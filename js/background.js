chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  console.log("js", request, sender, sendResponse)
}