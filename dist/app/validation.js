/* ******************************************
    DOM SELECTION
****************************************** */
const form = document.querySelector("form");
const username = document.querySelector("#username");
username.focus();
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const submitBtn = document.querySelector("form.button");
const successMsg = document.querySelector("#success-msg");
let successCount = 0;

/* ******************************************
    FUNCTIONS
****************************************** */

// check for valid length
function checkValidLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${convertToTitlecase(
        input.id
      )} length must be more than ${min} characters.`
    );
    console.log(
      `${convertToTitlecase(
        input.id
      )} length must be more than ${min} characters.`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${convertToTitlecase(
        input.id
      )} length must be less than ${max} characters.`
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// check for matching passwords (password, password2)
function checkMatchingPasswords(pw1, pw2) {
  if (pw1.value !== pw2.value || pw1.value === "") {
    showError(pw2, `${pw2.id} does not match`);
    showError(pw1, `${pw1.id} does not match`);
    return false;
  } else if (checkValidLength(pw1, 3, 20) && checkValidLength(pw2, 3, 20)) {
    successCount += 1;
    return true;
  }
}

// check for valid email (copy regex from stackoverflow)
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function checkValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// capitalise the first letter of input. Lowercase the rest
function convertToTitlecase(input) {
  const firstLetter = input[0].toUpperCase();
  return firstLetter + input.slice(1);
}

// show error message and add error class to smalls

/**
 * Documentation.
 * displays error message below input
 * @param {*} input takes in task
 * @param {*} message write message as string
 */
function showError(input, message) {
  const parent = input.parentElement;
  const small = getSmallTag(input);
  small.classList.add("error");
  small.innerText = message;
  parent.classList.remove("success");
  const inp = parent.querySelector("input");
  inp.className = "error-border";
}

// select parent element and then small tag

/**
 * Description.
 * returns small tag element associated to selected html element
 * @param {*} input enter html element selection
 * @returns html element 'small'
 */
function getSmallTag(input) {
  const parent = input.parentElement;
  const small = parent.querySelector("small");
  return small;
}

/**
 * Description.
 * adds 'success' class to the input's parentElement
 * @param {*} input enter HTML element      
 */
function showSuccess(input) {
  const parent = input.parentElement;
  parent.classList.add("success");
  getSmallTag(input).classList.remove("error");
}

/* ******************************************
    EVENT LISTENERS
****************************************** */

form.addEventListener("submit", function (e) {
  e.preventDefault();

  [
    checkValidLength(username, 3, 15),
    checkValidLength(email, 4, 20),
    checkValidEmail(email),
    checkMatchingPasswords(password, password2),
  ].forEach((item) => {
    console.log("forEach", item);
    if (item == true) {
      successCount += 1;
    }
    console.log("successCount in forEach: ", successCount);
  });

  if (successCount >= 4) {
    successMsg.innerText = "Thank you for registering.";
    [username, email, password, password2].forEach( input => {
      input.value = '';
    })
  }
  successCount = 0;
});
