
;(function initialize(){
  var keyboard = {
    layouts: {
      alphabet: [
        [
          {name: "a", num: 20}
        , {name: "b", num: 15}
        , {name: "c", num:  6}
        , {name: "d", num: 10}
        , {name: "#edit", num: 31}
        , {name: "&nbsp", num:  0}
        , {name: "#favourites", num: 25} // **..*•
        ]
      , [
          {name: "e", num: 16}
        , {name: "f", num: 14}
        , {name: "g", num: 13}
        , {name: "h", num: 12}
        , {name: "#numbers", num: 26}
        , {name: "#punctuation", num: 27}
        , {name: "#settings", num: 28}
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
    , favourites: "<3"
    , numbers: "#"
    , punctuation: ";"
    , settings: "Set"
    }
  , bits: 5
  , initial: "alphabet"
  , delay: 1000
  }

  var scannedKeys = []
  //var keyFilters = {}
  var bits = keyboard.bits
  var scanDelay = keyboard.delay
  var layout

  ;(function getScannedKeys(){
    // Creates an array of arrays of <span> elements, which should
    // have the same structure as each layout
    var keyboard = document.querySelectorAll(".k-keyboard p")
    scannedKeys = [].slice.call(keyboard)
    scannedKeys.forEach(function(row, index) {
      scannedKeys[index] = [].slice.call(row.children)
    })
  })()

  // ;(function createKeyFilters(){
  //   // return
  //   var layouts = keyboard.layouts
  //   var name
  //     , layout
  //     , filter
  //     , on
  //     , off
  //   //, all
  //     , char
  //     , num
  //     , bit
  //     , bitArray
  //     , element

  //   for (name in layouts) {
  //     createFilterForLayout(name)
  //   }

  //   function createFilterForLayout(name) {
  //     on = getBitLayout()
  //     off = getBitLayout()
  //     // all = getBitLayout()
  //     filter = { on: on, off: off } //, all: all }
  //     keyFilters[name] = filter
  //     layout = layouts[name] // array of arrays
  //     layout.forEach(function (row, rowIndex) {
  //       row.forEach(function (keyObject, keyIndex) {
  //         char = keyObject.name
  //         num = keyObject.num
  //         element = scannedKeys[rowIndex][keyIndex]

  //         for (bit = 0; bit < bits; bit += 1) {
  //           if (num % 2) {
  //             bitArray = on[bit]
  //           } else {
  //             bitArray = off[bit]
  //           }

  //           bitArray.push(element)
  //           num >>= 1
  //         }
  //       })
  //     })
  //   }

  //   function getBitLayout() {
  //     // If bits = 5, returns [[], [], [], [], []]
  //     var bitLayout = []
  //     var bit = bits
  //     while (bit) {
  //       bitLayout.push([])
  //       bit -= 1
  //     }

  //     return bitLayout
  //   }
  // })()

  setKeyLayout(keyboard.initial)
  startScanLoop()

  function setKeyLayout(layoutName) {
    layout = keyboard.layouts[layoutName]
    var icons = keyboard.icons
    var keys
      , keyObject
      , name
      , element

    scannedKeys.forEach(function (row, rowIndex) {
      keys = layout[rowIndex]
      row.forEach(function (element, keyIndex) {
        keyObject = keys[keyIndex]
        name = getKeyName(keyObject.name)
        element.innerHTML = name
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
    var firstPass = true
    var shift = bits
    var bitValue = 1 << bits // if bits = 5, bitValue will be 32
    var binary = 0
    var keyObject
      , num
      , trimmedNum
      , check
      , className

    ;(function scanSwitch(){
      bitValue >>= 1 // 32 - 16 - 8 - 4 - 2 - 1

      scannedKeys.forEach(function (row, rowIndex) {
        row.forEach(function (element, keyIndex) {
          keyObject = layout[rowIndex][keyIndex]
          num = keyObject.num       // e.g. 20 for "a" *.*..
          trimmedNum = num >> shift // e.g. 2 (*.) if we're on 2nd *
          check = (num & bitValue) !== 0

          if (firstPass) { // 
            if (trimmedNum === binary) {
              //
              if (check) {
                // This bit contributes to this character
                className = "highlight"
              } else {
                className = undefined
              }
            } else {
              className = "disable"
            }
          } else if (binary & bitValue === 0) {
            className = "highlight"
          } else {
            className = undefined
          }

          element.classList.remove("highlight")
          element.classList.remove("disable")
          if (className) {
            element.classList.add(className)
          }

        })
      })

      if (bitValue) {
        shift -= 1
        setTimeout(scanSwitch, scanDelay)
      }
    })()
  }
})()