
/**
 * Convert a web page to the Leet Speak writing system after a Konami code sequence on keyboard.
 */

// the official Konami Code sequence to do with keyboard
const KONAMI_CODE = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

// html tag to convert
const TAGS_TYPE_TO_CONVERT = ["title","legend", "h1", "h2", "h3", "h4", "h5", "h6",
                              "p", "a", "li", "input", "label", "button",
                              "th", "td", "span"];


/**
 * Function call when the page is completly load or after the Konami code sequence
 */
function convertToLeetSpeak() {
  console.log("Leet Speak conversion...");
  scanPage();
  console.log("Leet Speak Power !!!");
}

/**
 * Do an actionn on each part of text on the page
 */
function scanPage() {
  let tagList;
  let newString;

  // for each tag type
  for (tagType of TAGS_TYPE_TO_CONVERT) {
    tagList = document.querySelectorAll(tagType);

    // for each tag list
    for (tag of tagList) {
      newString = convertToSupremLanguage(tag.textContent);
      console.log(newString);
      tag.textContent = newString;
    }
  }
}

/**
 * Convert a string to the suprem language (the Leet Speak)
 */
function convertToSupremLanguage(string) {
  // remove accents and switch to upper case
  string = string.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  string = string.toUpperCase();

  // change char
  string = string.replaceAll("A", "4");
  string = string.replace(/E/gi, "3");
  string = string.replace(/I/gi, "1");
  string = string.replace(/O/gi, "0");
  string = string.replace(/U/gi, "μ");
  string = string.replace(/Y/gi, "λ");

  string = string.replace(/H/gi, "#");
  string = string.replace(/P/gi, "¶");
  string = string.replace(/S/gi, "$");

  return string;
}


// Konami code detection
// a key map of allowed keys
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};


// Part use to catch the Konami code event
// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  var requiredKey = KONAMI_CODE[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {

    // move to the next key in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate cheats
    if (konamiCodePosition == KONAMI_CODE.length) {
      convertToLeetSpeak();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

  //var audio = new Audio('audio/pling.mp3');
  //audio.play();

// end of the API
