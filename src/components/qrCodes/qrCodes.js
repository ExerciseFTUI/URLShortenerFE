const VERSIONS = [ 0,
      7,  14,  24,  34,  44,   58,   64,   84,   98,  119,
    137, 155, 177, 194, 220,  250,  280,  310,  338,  382,
    403, 439, 461, 511, 535,  593,  625,  658,  698,  742,
    790, 842, 898, 958, 983, 1051, 1093, 1139, 1219, 1273, 
]

const TOTAL_DATA_CODEWORDS = [ 0,
    9,  16,  26,  36,  46,   60,   66,   86,  100,  122,
  140, 158, 180, 197, 223,  253,  283,  313,  341,  385,
  406, 442, 464, 514, 538,  596,  628,  661,  701,  745,
  793, 845, 901, 961, 986, 1054, 1096, 1142, 1222, 1276,
]

const EC = [ { b1: 0, c1: 0, b2: 0, c2: 0, ec: 0 },
    { ec: 17, b1: 1, c1: 9, b2: 0, c2: 0 },
    { ec: 28, b1: 1, c1: 16, b2: 0, c2: 0 },
    { ec: 22, b1: 2, c1: 13, b2: 0, c2: 0 },
    { ec: 16, b1: 4, c1: 9, b2: 0, c2: 0 },
    { ec: 22, b1: 2, c1: 11, b2: 2, c2: 12 },
    { ec: 28, b1: 4, c1: 15, b2: 0, c2: 0 },
    { ec: 26, b1: 4, c1: 13, b2: 1, c2: 14 },
    { ec: 26, b1: 4, c1: 14, b2: 2, c2: 15 },
    { ec: 24, b1: 4, c1: 12, b2: 4, c2: 13 },
    { ec: 28, b1: 6, c1: 15, b2: 2, c2: 16 },
    { ec: 24, b1: 3, c1: 12, b2: 8, c2: 13 },
    { ec: 28, b1: 7, c1: 14, b2: 4, c2: 15 },
    { ec: 22, b1: 12, c1: 11, b2: 4, c2: 12 },
    { ec: 24, b1: 11, c1: 12, b2: 5, c2: 13 },
    { ec: 24, b1: 11, c1: 12, b2: 7, c2: 13 },
    { ec: 30, b1: 3, c1: 15, b2: 13, c2: 16 },
    { ec: 28, b1: 2, c1: 14, b2: 17, c2: 15 },
    { ec: 28, b1: 2, c1: 14, b2: 19, c2: 15 },
    { ec: 26, b1: 9, c1: 13, b2: 16, c2: 14 },
    { ec: 28, b1: 15, c1: 15, b2: 10, c2: 16 },
    { ec: 30, b1: 19, c1: 16, b2: 6, c2: 17 },
    { ec: 24, b1: 34, c1: 13, b2: 0, c2: 0 },
    { ec: 30, b1: 16, c1: 15, b2: 14, c2: 16 },
    { ec: 30, b1: 30, c1: 16, b2: 2, c2: 17 },
    { ec: 30, b1: 22, c1: 15, b2: 13, c2: 16 },
    { ec: 30, b1: 33, c1: 16, b2: 4, c2: 17 },
    { ec: 30, b1: 12, c1: 15, b2: 28, c2: 16 },
    { ec: 30, b1: 11, c1: 15, b2: 31, c2: 16 },
    { ec: 30, b1: 19, c1: 15, b2: 26, c2: 16 },
    { ec: 30, b1: 23, c1: 15, b2: 25, c2: 16 },
    { ec: 30, b1: 23, c1: 15, b2: 28, c2: 16 },
    { ec: 30, b1: 19, c1: 15, b2: 35, c2: 16 },
    { ec: 30, b1: 11, c1: 15, b2: 46, c2: 16 },
    { ec: 30, b1: 59, c1: 16, b2: 1, c2: 17 },
    { ec: 30, b1: 22, c1: 15, b2: 41, c2: 16 },
    { ec: 30, b1: 2, c1: 15, b2: 64, c2: 16 },
    { ec: 30, b1: 24, c1: 15, b2: 46, c2: 16 },
    { ec: 30, b1: 42, c1: 15, b2: 32, c2: 16 },
    { ec: 30, b1: 10, c1: 15, b2: 67, c2: 16 },
    { ec: 30, b1: 20, c1: 15, b2: 61, c2: 16 }
]

let INPUT = "Hello, world!" // "https://www.google.com"

const INPUT_LENGTH = INPUT.length
const INPUT_LENGTH_IN_BINARY = INPUT_LENGTH.toString(2)

const ENCODED_INPUT = encodeURIComponent(INPUT) // UTF+8
const INPUT_IN_BINARY = convertInputToBinary(INPUT)

const MODE = "0100" // BYTE MODE
const ERROR_CORRECTION = "H" // 30% Correction

const MAX_CHAR = VERSIONS[40]
const MIN_CHAR = findMinChar(INPUT_LENGTH)
const VERSION_USED = VERSIONS.indexOf(MIN_CHAR)
const CORRECTION_USED = EC[VERSION_USED]
const BITS_REQUIRED = TOTAL_DATA_CODEWORDS[VERSION_USED] * 8

const CHAR_COUNT_INDICATOR = findCharacterCountIndicator(INPUT_LENGTH_IN_BINARY)

let bitString = CHAR_COUNT_INDICATOR + INPUT_IN_BINARY

let bitStringWithTerminator = addTerminator(bitString, BITS_REQUIRED)
let bitStringWithPaddedBytes = addPadBytes(bitStringWithTerminator, BITS_REQUIRED)

let splittedBits = bitStringWithPaddedBytes.match(/.{1,8}/g)

function findMinChar(charLength = 0) {
  for (let i = 1; i <= VERSIONS.length; i++) {
    if (charLength <= VERSIONS[i]) return VERSIONS[i]
  }
}

function findCharacterCountIndicator(lengthBinary = "") {
  let length = VERSION_USED < 10 ? 8 : 16

  return MODE + lengthBinary.padStart(length, "0")
}

function convertInputToBinary(input = "", length = 8) {
  let binaryInput = ""

  for (let i = 0; i < INPUT_LENGTH; i++) {
    binaryInput += input.charCodeAt(i).toString(2).padStart(length, "0")
  }

  return binaryInput
}

function addTerminator(bitString = "", bitsRequired = 0) {
  let temp = bitString
  let dif = bitsRequired - temp.length

  if (dif < 4)
    for (let i = 0; i < dif; i++) {
      temp += "0"
    }
  else temp += "0000"

  dif = temp.length % 8

  if (dif != 0)
    for (let i = 0; i < 8 - dif; i++) {
      temp += "0"
    }

  return temp
}

function addPadBytes(binary = "", length = 0) {
  const padBinary = ["11101100", "00010001"]

  let padded = binary
  let choosePad = 0
  let dif = length - padded.length

  for (let i = 0; i < dif / 8; i++) {
    if (choosePad > 1) choosePad = 0

    padded += padBinary[choosePad]

    choosePad++
  }

  return padded
}
