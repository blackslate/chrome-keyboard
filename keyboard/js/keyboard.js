"use strict"

;(function keyboard(window, document){
  // Should be read in as JSON file, along with custom HTML and CSS
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
    , punctuation: [
         // ,^()
         // .¶[]
         // !{}«»*
         // ?-\/&@
         // :;_"'—
        [
          {name: ".", num: 20}
        , {name: "#upperCase", num: 15}
        , {name: "(", num:  6}
        , {name: ")", num: 10}
        , {name: "#edit", num: 31}
        , {name: "#space", num: 0}
        , {name: "#tab", num: 25} // **..*•
        ]
      , [
          {name: ",", num: 16}
        , {name: "¶", num: 14}
        , {name: "[", num: 13}
        , {name: "]", num: 12}
        , {name: "#numbers", num: 26}
        , {name: "#punctuation", num: 27}
        , {name: "#more", num: 28}
        ]
      , [
          {name: "!", num: 17}
        , {name: "{", num: 29}
        , {name: "}", num:  7}
        , {name: "«&nbsp", num:  9}
        , {name: "&nbsp»", num:  5}
        , {name: "#", num:  4}
        ]
      , [
          {name: "?", num: 18}
        , {name: "-", num: 11}
        , {name: "\\",num: 30}
        , {name: "/", num:  1}
        , {name: "&", num:  2}
        , {name: "@", num:  8}
        ]
      , [
          {name: ";", num: 22}
        , {name: ":", num: 23}
        , {name: "_", num: 21}
        , {name: '"', num:  3}
        , {name: "'", num: 24}
        , {name: "—", num: 19}
        ]
      ]
    , numbers: [
        [
          {name: "+", num: 20}
        , {name: "-", num: 15}
        , {name: "×", num:  6}
        , {name: "/", num: 10}
        , {name: "#edit", num: 31}
        , {name: "#space", num: 0}
        , {name: "#tab", num: 25} // **..*•
        ]
      , [
          {name: "=", num: 16}
        , {name: "%", num: 14}
        , {name: "<", num: 13}
        , {name: ">", num: 12}
        , {name: "#numbers", num: 26}
        , {name: "#punctuation", num: 27}
        , {name: "#more", num: 28}
        ]
      , [
          {name: "1", num: 17}
        , {name: "2", num: 29}
        , {name: "3", num:  7}
        , {name: "4", num:  9}
        , {name: "5", num:  5}
        , {name: ".", num:  4}
        ]
      , [
          {name: "6", num: 18}
        , {name: "7", num: 11}
        , {name: "8",num: 30}
        , {name: "9", num:  1}
        , {name: "0", num:  2}
        , {name: ",", num:  8}
        ]
      , [
          {name: "*", num: 22}
        , {name: "|", num: 23}
        , {name: "&", num: 21}
        , {name: '~', num:  3}
        , {name: "$", num: 24}
        , {name: "¢", num: 19}
        ]
      ]
   , more: [
        [
          {name: "à", num: 20}
        , {name: "â", num: 15}
        , {name: "ç", num:  6}
        , {name: "æ", num: 10}
        , {name: "#edit", num: 31}
        , {name: "#space", num: 0}
        , {name: "#tab", num: 25} // **..*•
        ]
      , [
          {name: "é", num: 16}
        , {name: "è", num: 14}
        , {name: "ê", num: 13}
        , {name: "ë", num: 12}
        , {name: "#numbers", num: 26}
        , {name: "#punctuation", num: 27}
        , {name: "#more", num: 28}
        ]
      , [
          {name: "î", num: 17}
        , {name: "ï", num: 29}
        , {name: "¡", num:  7}
        , {name: "¿", num:  9}
        , {name: "°", num:  5}
        , {name: "•", num:  4}
        ]
      , [
          {name: "ô", num: 18}
        , {name: "œ", num: 11}
        , {name: "£",num: 30}
        , {name: "€", num:  1}
        , {name: "¥", num:  2}
        , {name: "¢", num:  8}
        ]
      , [
          {name: "ù", num: 22}
        , {name: "û", num: 23}
        , {name: "ü", num: 21}
        , {name: '`', num:  3}
        , {name: "ÿ", num: 24}
        , {name: "√", num: 19}
        ]
      ]
    }
  , icons: {
      alphabet: "ABC"
    , edit: "Edit"
    , space: "&nbsp"
    , tab: "TAB"
    , numbers: "123"
    , punctuation: ",.?!"
    , more: "éèêë"
    , upperCase: "Aa"
    }
  , bits: 5
  , initial: "alphabet"
  , delay: 1000
  , actionRatio: 1.1 // 1100 - 1210 - 1331 - 1464 - ...
  , maxDelay: 2000
  , autoCapitalize: true
  }

  var LayoutManager = (function (layouts) {
    function LayoutManager() {
      
    }

    LayoutManager.prototype.move = function () {
    }

    return LayoutManager;
  })();

  var layoutManager = new LayoutManager()
  var FOCUS_DELAY = 10
  var userIsAble = false

  var preview = document.querySelector(".k-preview span")
  var textArea = document.querySelector(".k-container textarea")
  var dotArray = document.querySelectorAll(".k-binary span")
      dotArray = [].slice.call(dotArray)
  var scannedKeys = []
  var keyLUT = []
  var elementLUT = []
  var icons = keyboard.icons
  var bits = keyboard.bits
  var scanDelay = keyboard.delay
  var actionDelay = scanDelay
  var actionRatio = keyboard.actionRatio
  var maxDelay = keyboard.maxDelay
  var binary = 0
  var bitValue = 0
  var switchValue = 0
  var bitIndex = 0
  var off = true
  var touched = false
  var upperCase = keyboard.autoCapitalize
  var capsLock = false

  var layout
    , clickStamp
    , clickElement
    , focusElement
    , scanTimeout
    , focusTimeout
    , pass
    , input
    , specialAction
    , confirmed

  document.addEventListener("keydown", treatKeyDown, false)
  document.addEventListener("mousedown", treatMouseDown, false)
  document.addEventListener("focus", updateFocus, true)

  function treatKeyDown(event) {
    if (focusElement || event.ctrlKey || event.metaKey || touched) {
      // An able user is typing in an input field or using a keyboard
      // shortcut
      return
    }

    event.preventDefault()
    // Select current bit
    var dot = dotArray[bitIndex - 1]
    touched = true

    if (bitIndex > bits) { 
      actOnInput()
    } else {
      binary += switchValue
      if (pass) {
        showInput()
      }

      if (switchValue > 0) {    
        dot.classList.remove("off")
        dot.classList.add("on")
      } else {
        dot.classList.remove("on")
        dot.classList.add("off")
      }
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
      focusTimeout = window.setTimeout(startScanLoop, FOCUS_DELAY)
    }
  }

  function updateFocus(event) {  
    userIsAble = new Date() - clickStamp < FOCUS_DELAY
    if (userIsAble) {
      userIsAble = (event.target === clickElement)
    }

    if (userIsAble) {
      // Focus was moved to a new element by a click: an able user
      // is active
      textArea.classList.add("focus")
      focusElement = clickElement
      window.clearTimeout(scanTimeout)
      window.clearTimeout(focusTimeout)
      resetDots()
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
    if (layoutName) {
      layout = keyboard.layouts[layoutName]
    }
    if (!layout) {
      return
    }

    keyLUT.length = 0
    elementLUT.length = 0
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
        keyLUT[num] = getKeyName(name, true) // may be "#iconName"
        elementLUT[num] = element
        element.innerHTML = getKeyName(name, false)
      })
    })
  }

  function getKeyName(name, respectHash) {
    if (name.length > 1 && name.charAt(0) === "#") {
      if (respectHash) {
        // Leave name as it is
      } else {
        name = icons[name.substring(1)]
      }
    } else if (upperCase) {
      name = name.charAt(0).toUpperCase() + name.slice(1)
    }

    return name
  }

  function startScanLoop() {
    var dot = dotArray[dotArray.length - 1]
    var maskValue
      , keyObject
      , num
      , maskedNum
      , check
      , className
    
    actionDelay = scanDelay
    binary = 0
    confirmed = false
    pass = 0
    specialAction = false


    resetKeyClasses()
    startLoop()

    function startLoop() {

      bitValue = 1 << bits // if bits = 5, bitValue will be 32
      bitIndex = 0
      maskValue = 0

      scanSwitch()
    }

    function scanSwitch(){
      setDotClass()
      bitValue >>= 1 // 32 - 16 - 8 - 4 - 2 - 1 - 0
      // If binary contains bitValue, switchValue should be negative
      switchValue = (binary & bitValue) ? -bitValue : bitValue
      bitIndex += 1
      off = true
      touched = false

      scannedKeys.forEach(function (row, rowIndex) {
        row.forEach(function (element, keyIndex) {
          keyObject = layout[rowIndex][keyIndex]
          num = keyObject.num         // e.g. 20 for "a" *.*..
          maskedNum = num & maskValue // e.g. 16 for "a" at 2nd bit
          check = (num & bitValue) !== 0 // true if char uses this bit

          if (!pass) {
            className = firstPassClassName()
          } else {
            className = subsequentPassClassName()
          }

          element.classList.remove("chosen")
          element.classList.remove("highlight")
          element.classList.remove("disable")
          if (className) {
            element.classList.add(className)
          }
        })
      })

      if (bitValue) {
        maskValue += bitValue
        scanTimeout = window.setTimeout(scanSwitch, actionDelay)

      } else {
        showInput(true)
        scanTimeout = window.setTimeout(checkIfConfirmed, actionDelay)
      }

      function firstPassClassName() {
        if (maskedNum === binary) {
           if (check) {
            return "highlight"
          } else {
            return undefined
          }
        } else {
          return "disable"
        }
      }

      function subsequentPassClassName() {
        var used
          , active

        if (bitValue) {
          used = (binary & bitValue) !== 0
          active = pass > 1 || maskedNum === (binary & maskValue)
          if (active) {
            if (check !== used) {
              return "highlight"
            }
          } else {
            return "disable"
          }
        }

        return undefined
      }
      
      function checkIfConfirmed() {
        if (confirmed) {
          //actOnInput()
          resetKeyClasses()
          startScanLoop()
        } else {
          actionDelay = Math.min(actionDelay * actionRatio, maxDelay)
          pass += 1
          startLoop()     
        }
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

  function resetKeyClasses() {
    scannedKeys.forEach(function (row, rowIndex) {
      row.forEach(function (element, keyIndex) {
        element.classList.remove("chosen")
        element.classList.remove("highlight")
        element.classList.remove("disable")
      })
    })

    resetDots()
  }

  function resetDots() {
    dotArray.forEach(function (dot) {
      dot.classList.remove("on")
      dot.classList.remove("off")
      dot.classList.remove("active")
    })
  }

  function showInput(chosen) {
    input = keyLUT[binary]
    specialAction = (input.length > 1 && input.charAt(0) === "#")

    if (specialAction) {
      prepareSpecialAction()
    } else {
      // Remove all special settings
      preview.className = ""
      preview.innerHTML = input
    }

    if (chosen) {
      var element = elementLUT[binary]
      element.classList.add("chosen")
    }
  }

  function actOnInput() {
    if (specialAction) {
      doSpecialAction()
    } else {
      textArea.innerHTML += input
    }

    input = ""
    confirmed = true

    if (upperCase && !capsLock) {
      upperCase = false
      setKeyLayout()
    }
  }

  function doSpecialAction() {
    switch (input) {
      case "#space":
        textArea.innerHTML += " "
      break
      case "#punctuation":
      case "#numbers":
      case "#more":
        setKeyLayout(input.substring(1))
      break
    }
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
})(window, document)