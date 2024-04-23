const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

var emailUnused = false;
var usernameGood = false;
const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/);

document.getElementById("id_first_name").onkeyup = validateForm;
document.getElementById("id_last_name").onkeyup = validateForm;

document.getElementById("id_password1").onkeyup = checkPassword;
document.getElementById("id_password2").onkeyup = checkPassword;

document.getElementById("id_username").onkeyup = checkUsername;

document.getElementById("id_email").onkeyup = checkEmail;

function validateForm() {
  var username = document.getElementById("id_username").value;
  var email = document.getElementById("id_email");
  var fName = document.getElementById("id_first_name").value;
  var lName = document.getElementById("id_last_name").value;
  var password1 = document.getElementById("id_password1");
  var password2 = document.getElementById("id_password2");

  var toolTip = document.getElementById("ToolTipRegister");
  var registerButton = document.getElementById("registerButton");

  var emailTest = emailRegex.test(email.value);

  if (
    username !== "" &&
    email.value !== "" &&
    emailTest &&
    fName !== "" &&
    lName !== "" &&
    password1.value !== "" &&
    password2.value !== "" &&
    password1.value === password2.value &&
    emailUnused &&
    usernameGood
  ) {
    bootstrap.Tooltip.getInstance(toolTip).disable();
    registerButton.removeAttribute("disabled");
  } else {
    bootstrap.Tooltip.getInstance(toolTip).enable();
    registerButton.setAttribute("disabled", "");
  }
}

function checkUsername() {
  const username = document.getElementById("id_username");
  var usernameHelpText = document.getElementById("id_username_helptext");
  if (username.value !== "" && !RegExp(/^[A-Za-z0-9@.+\-_]{1,150}$/).test(username.value)) {
    setInputStyling("bad", username, usernameHelpText);
    usernameHelpText.innerText = "ERROR: Max of 150 characters. Letters, digits and @/./+/-/_ only.";
    usernameGood = false;
    validateForm();
    return;
  }
  fetch("checkTaken?username=" + username.value)
    .then((response) => response.json())
    .then((responseJSON) => {
      var status = responseJSON["used"];
      if (username.value !== "") {
        if (status === "true") {
          setInputStyling("bad", username, usernameHelpText);
          usernameGood = false;
          usernameHelpText.innerText = "That username is already in use";
        } else {
          usernameGood = true;
          setInputStyling("good", username, usernameHelpText);
          usernameHelpText.innerText = "That looks good";
        }
      } else {
        setInputStyling("original", username, usernameHelpText);
        usernameHelpText.innerText = "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.";
        usernameGood = false;
      }
      validateForm();
    });
  validateForm();
}

function checkEmail() {
  const email = document.getElementById("id_email");
  var emailHelpText = document.getElementById("id_email_helptext");
  var emailTest = emailRegex.test(email.value);
  if (!emailTest) {
    if (email.value === "") {
      emailUnused = false;
      setInputStyling("original", email, emailHelpText);
      emailHelpText.innerText = "Required: Enter a email in the format example@example.com";
    } else {
      emailUnused = true;
      setInputStyling("bad", email, emailHelpText);
      emailHelpText.innerText = "Email is not in the correct format, ex: example@example.com";
    }
  } else {
    fetch("checkTaken?email=" + email.value)
      .then((response) => response.json())
      .then((responseJSON) => {
        var status = responseJSON["used"];
        if (email.value !== "") {
          if (status === "true") {
            setInputStyling("bad", email, emailHelpText);
            emailUnused = false;
            emailHelpText.innerText = "That email is already in use";
          } else if (emailTest) {
            setInputStyling("good", email, emailHelpText);
            emailUnused = true;
            emailHelpText.innerText = "That looks good";
          }
        }
        validateForm();
      });
  }
  validateForm();
}

function checkPassword(self) {
  var password1 = document.getElementById("id_password1");
  var password2 = document.getElementById("id_password2");
  var password_helptext = document.getElementById("id_password2_helptext");
  if (password1.value !== "" && password2.value !== "") {
    if (password1.value !== password2.value) {
      password_helptext.innerText = "The passwords do not match";
      setInputStyling("bad", password2, password_helptext);
      setInputStyling("bad", password1, password_helptext);
      if (self.target === password2) {
        password2.setCustomValidity("Passwords do not match.");
        password2.reportValidity();
      } else if (self.target === password1) {
        password1.setCustomValidity("Passwords do not match.");
        password1.reportValidity();
      }
    } else {
      password2.setCustomValidity("");
      password1.setCustomValidity("");
      password_helptext.innerText = "The passwords match";
      setInputStyling("good", password2, password_helptext);
      setInputStyling("good", password1, password_helptext);
    }
  } else {
    password_helptext.innerText = "Enter the same password as before, for verification.";
    setInputStyling("original", password2, password_helptext);
    setInputStyling("original", password1, password_helptext);
  }
  validateForm();
}
function setInputStyling(used, input, helpText) {
  if (used === "bad") {
    input.classList.add("inputERR");
    input.classList.remove("inputGood");
    helpText.classList.add("helptextBad");
    helpText.classList.remove("helptextGood");
  } else if (used === "good") {
    input.classList.add("inputGood");
    input.classList.remove("inputERR");
    helpText.classList.remove("helptextBad");
    helpText.classList.add("helptextGood");
  } else {
    input.classList.remove("inputGood");
    input.classList.remove("inputERR");
    helpText.classList.remove("helptextBad");
    helpText.classList.remove("helptextGood");
    helpText.classList.add("helptext");
  }
}
window.onload = function () {
  checkUsername();
  checkEmail();
  validateForm();
};
