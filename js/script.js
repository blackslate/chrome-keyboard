;(function scripts(){
  var keyboardDiv
  var keyboardHeight

  // Ensure that the stylesheet for the keyboard is available
  var link = document.createElement("link");
  link.href = chrome.extension.getURL("css/keyboard.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
  delete link;

  // Add keyboard.html to page    
  var url = "/html/keyboard.html"
  var xhr = new XMLHttpRequest()
  xhr.open("GET", chrome.extension.getURL(url), true)
  xhr.onreadystatechange = loadKeyboard
  xhr.send()

  function loadKeyboard() {
    if (xhr.readyState === 4) {
      keyboardDiv = document.createElement("div")
      keyboardDiv.className = "salamanca"

      keyboardDiv.innerHTML = xhr.responseText
      document.body.appendChild(keyboardDiv)
      delete xhr

      startInputDetection()
    }
  }

  function startInputDetection() {
    window.addEventListener("focus", checkForInput, true)
    window.addEventListener("blur", checkForInput, true)

    var timeout

    function checkForInput(event) {
      var eventType = event.type
      var activeElement = document.activeElement
      var type = activeElement.nodeName.toLowerCase()
      switch (type) {
        case "input":
        case "textarea":
          keyboardDiv.classList.add("active")
          setKeyboardHeight()
        break
        default:
          // Don't remove the "active" class if it will be restored
          // an instant later. 
          timeout = setTimeout(function () {
            keyboardDiv.classList.remove("active")
          }, 0)
      }

      if (eventType === "focus") {
        if (timeout) {
          clearTimeout(timeout)
          timeout = 0
        }

        var inputBottom = activeElement.getBoundingClientRect().bottom
        var scrollY = window.scrollY
        var deltaY = keyboardHeight - window.innerHeight + inputBottom
        var minScroll = scrollY + deltaY

        if (scrollY < minScroll) {
          window.scroll(window.scrollX, minScroll)
        }
      }
    }

    function setKeyboardHeight() {
      if (!keyboardHeight) {
        keyboardHeight = keyboardDiv.getBoundingClientRect().height
      }
    }
  }
})()


// function vk_ajax_load_main() {
//   if (xhr.readyState == 4) {
//   virtualKeyboardChromeExtensionKeyboardElement = document.createElement("div");
//   chrome.extension.sendRequest({method: "initLoadKeyboardSettings"}, function(response) {
//     //hardwareAcceleration
//     if (response.hardwareAcceleration == "false") {
//       hardwareAcceleration = false;
//     } else {
//       hardwareAcceleration = true;
//       virtualKeyboardChromeExtensionKeyboardElement.className = "ha";
//     }

//     if (response.repeatLetters == "false") {
//       virtualKeyboardChromeExtensionRepeatLetters = false;
//     } else {
//       virtualKeyboardChromeExtensionRepeatLetters = true;
//     }
    
//     // zoomLevel
//     if (response.zoomLevel == undefined) { response.zoomLevel = 0; }
//     if (parseFloat(response.zoomLevel) >= 0.3) {
//       document.getElementById("virtualKeyboardChromeExtension").style.setProperty("zoom", response.zoomLevel);
//     } else {
//       document.getElementById("virtualKeyboardChromeExtension").style.zoom = "";
//     }
        
//     // autoTrigger
//     if (response.autoTrigger != undefined) {
//       autoTrigger = response.autoTrigger == "true";
//     }

//     // autoTriggerLinks
//     if (response.autoTriggerLinks != undefined) {
//       autoTriggerLinks = response.autoTriggerLinks == "true";
//     }
    
//     // intelligentScroll
//     if (response.intelligentScroll != undefined) {
//       intelligentScroll = response.intelligentScroll == "true";
//     }
    
//     // autoTriggerAfter
//     if (response.autoTriggerAfter == undefined) { response.autoTriggerAfter = 1; }
//     autoTriggerAfter = response.autoTriggerAfter*1000;
//   });

//   virtualKeyboardChromeExtensionKeyboardElement.innerHTML = xhr.responseText;
//   document.body.appendChild(virtualKeyboardChromeExtensionKeyboardElement);
//   init_virtualKeyboardChromeExtension(true);
//   setInterval(init_virtualKeyboardChromeExtension_false, 500);
//   delete xhr;
//   }
// }