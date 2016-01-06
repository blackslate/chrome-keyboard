;(function scripts(){
  var keyboardDiv
  var keyboardHeight

  ;(function injectHTMLandCSS(){
    // Ensure that the stylesheet for the keyboard is available
    var link = document.createElement("link");
    //link.href = chrome.extension.getURL("css/keyboard.css");
    link.href = "../css/keyboard.css"
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
    delete link;

    // Add keyboard.html to page    
    var url = "/html/keyboard.html"
    var xhr = new XMLHttpRequest()
    //xhr.open("GET", chrome.extension.getURL(url), true)
    xhr.open("GET", "keyboard.html", true)
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
      window.addEventListener("mousedown", oneTouch, false)

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

  function notChildOfKeyboard(element) {
    while (element = element.parentNode) {
      if (element === keyboardDiv) {
        return false
      }
    }

    return true
  }

  function oneTouch(event) {
    if (notChildOfKeyboard(event.target)) {
      return
    }

    if (keyboardDiv.classList.contains("active")) {
      event.preventDefault()
 

      console.log(event)     
    }
  }
})()