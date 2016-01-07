"use strict"

;(function keyboard(window, document){
  var FOCUS_DELAY = 10
  var userIsAble = false
  var keyboard = {
    layouts: {
      alphabet: [
        [
          {name: "a", num: 20}
        , {name: "b", num: 15}
        , {name: "c", num:  6}
        , {name: "d", num: 10}
        , {name: "#edit", num: 31}
        , {name: "#space", num: 0}
        , {name: "#tab", num: 25} // **..*•
        ]
      , [
          {name: "e", num: 16}
        , {name: "f", num: 14}
        , {name: "g", num: 13}
        , {name: "h", num: 12}
        , {name: "#numbers", num: 26}
        , {name: "#punctuation", num: 27}
        , {name: "#more", num: 28}
        ]
      , [
          {name: "i", num: 17}
        , {name: "j", num: 29}
        , {name: "k", num:  7}
        , {name: "l", num:  9}
        , {name: "m", num:  5}
        , {name: "n", num:  4}
        ]
      , [
          {name: "o", num: 18}
        , {name: "p", num: 11}
        , {name: "qu",num: 30}
        , {name: "r", num:  1}
        , {name: "s", num:  2}
        , {name: "t", num:  8}
        ]
      , [
          {name: "u", num: 22}
        , {name: "v", num: 23}
        , {name: "w", num: 21}
        , {name: "x", num:  3}
        , {name: "y", num: 24}
        , {name: "z", num: 19}
        ]
      ]
    }
  , icons: {
      alphabet: "ABC"
    , edit: "Edit"
    , space: "&nbsp"
    , tab: "TAB"
    , favourites: "<3"
    , numbers: "#"
    , punctuation: ";"
    , more: "<3"
    }
  , bits: 5
  , initial: "alphabet"
  , delay: 1000
  }

  var preview = document.querySelector(".k-preview span")
  var textArea = document.querySelector(".k-container textarea")
  var dotArray = document.querySelectorAll(".k-binary span")
      dotArray = [].slice.call(dotArray)
  var scannedKeys = []
  var keyLUT = []
  var bits = keyboard.bits
  var scanDelay = keyboard.delay
  var binary = 0
  var bitValue = 0
  var bitIndex = 0
  var off = true
  var layout
    , clickStamp
    , clickElement
    , focusElement
    , timeout
    , input
    , specialAction
    , confirmed

  window.addEventListener("keydown", treatKeyDown, false)
  window.addEventListener("mousedown", treatMouseDown, false)
  window.addEventListener("focus", updateFocus, true)

  function treatKeyDown(event) {
    if (focusElement || event.ctrlKey || event.metaKey) {
      // An able user is typing in an input field or using a keyboard
      // shortcut
      return
    }

    event.preventDefault()
    // Select current bit
    var dot = dotArray[bitIndex - 1]

    console.log(bitIndex, "keydown")

    if (bitIndex > bits) { 
      confirmed = true
    } else {
      binary += bitValue
      dot.classList.add("on")
    }

    off = false
  }

  function treatMouseDown(event) {
    clickStamp = + new Date()
    clickElement = event.target
    // Assume that an able user is clicking outside a focusable
    // element to give control back to a disabled user
    userIsAble = (clickElement === focusElement)
    if (!userIsAble) {
      focusElement = null
      textArea.classList.remove("focus")
    }
  }

  function updateFocus(event) {
    if (event.target === clickElement) {
      userIsAble = new Date() - clickStamp < FOCUS_DELAY
      if (userIsAble) {
        // Focus was moved to a new element by a click: an able user
        // is active
        textArea.classList.add("focus")
        focusElement = clickElement
        window.clearTimeout(timeout)
      }
    }
  }

  ;(function getScannedKeys(){
    // Creates an array of arrays of <span> elements, which should
    // have the same structure as each layout
    var keyboard = document.querySelectorAll(".k-keyboard p")
    scannedKeys = [].slice.call(keyboard)
    scannedKeys.forEach(function(row, index) {
      scannedKeys[index] = [].slice.call(row.children)
    })
  })()

  setKeyLayout(keyboard.initial)
  startScanLoop()

  function setKeyLayout(layoutName) {
    layout = keyboard.layouts[layoutName]
    keyLUT.length = 0
    var icons = keyboard.icons
    var keys
      , keyObject
      , name
      , num
      , element

    scannedKeys.forEach(function (row, rowIndex) {
      keys = layout[rowIndex]
      row.forEach(function (element, keyIndex) {
        keyObject = keys[keyIndex]
        name = keyObject.name
        num = keyObject.num
        keyLUT[num] = name
        element.innerHTML = getKeyName(name)
      })
    })

    function getKeyName(name) {
      if (name.length > 1) {
        if (name.charAt(0) === "#") {
          name = icons[name.substring(1)]
        }
      }

      return name
    }
  }

  function startScanLoop() {
    var pass = 0
    var dot = dotArray[dotArray.length - 1]
    var maskValue
      , keyObject
      , num
      , maskedNum
      , check
      , className
    
    binary = 0
    confirmed = false
    specialAction = false

    startLoop()

    function startLoop() {
      bitValue = 1 << bits // if bits = 5, bitValue will be 32
      bitIndex = 0
      maskValue = 0
      off = true

      scanSwitch()
    }

    function scanSwitch(){
      setDotClass()
      bitValue >>= 1 // 32 - 16 - 8 - 4 - 2 - 1 - 0
      bitIndex += 1

      scannedKeys.forEach(function (row, rowIndex) {
        row.forEach(function (element, keyIndex) {
          keyObject = layout[rowIndex][keyIndex]
          num = keyObject.num         // e.g. 20 for "a" *.*..
          maskedNum = num & maskValue // e.g. 16 for "a" at 2nd bit
          check = (num & bitValue) !== 0 // true if char uses this bit

          if (!pass) { // 
            if (maskedNum === binary) {
               if (check) {
                // This bit contributes to this character
                className = "highlight"
              } else {
                className = undefined
              }
            } else {
              className = "disable"
            }

          } else if (bitValue) {
            // Correction: show highlight if this bit could be toggled
            if (binary & bitValue === 0) {
              className = "highlight"
            } else {
              className = undefined
            }
          }

          element.classList.remove("highlight")
          element.classList.remove("disable")
          if (className) {
            element.classList.add(className)
          }
        })
      })

      if (bitValue) {
        console.log(bitIndex)
        maskValue += bitValue
        timeout = window.setTimeout(scanSwitch, scanDelay)

      } else {
        showInput()
        timeout = window.setTimeout(checkIfConfirmed, scanDelay)
      }

      function showInput() {
        input = keyLUT[binary]
        specialAction = (input.length > 1 || input.charAt(0) === "#")

        if (specialAction) {
          prepareSpecialAction()
        } else {
          // Remove all special settings
          preview.className = "k-preview"
          preview.innerHTML = input
        }
      }
      
      function checkIfConfirmed() {
        if (confirmed) {
          actOnInput()
          resetKeyClasses()
          startScanLoop()
        } else {
          pass += 1
          startLoop()     
        }
      }

      function actOnInput() {
        if (specialAction) {
          doSpecialAction()
        } else {
          textArea.innerHTML += input
        }

        input = ""
      }

      function prepareSpecialAction() {
        switch (input) {
          case "#space":
          default:
            preview.classList.add("special")
            preview.innerHTML = input
          break
        }
      }

      function doSpecialAction() {
        switch (input) {
          case "#space":
            textArea.innerHTML += " "
          break
        }
      }

      function resetKeyClasses() {
        scannedKeys.forEach(function (row, rowIndex) {
          row.forEach(function (element, keyIndex) {
            element.classList.remove("highlight")
            element.classList.remove("disable")
          })
        })

        dotArray.forEach(function (dot) {
          dot.classList.remove("on")
          dot.classList.remove("off")
        })
      }

      function setDotClass() {
        dot.classList.remove("active")
        if (!pass && off) {
          dot.classList.add("off") // does not affect green "go" dot
        }
        dot = dotArray[bitIndex]
        dot.classList.add("active")
      }
    }
  }
})(window, document)