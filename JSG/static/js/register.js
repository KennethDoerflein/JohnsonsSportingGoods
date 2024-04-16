const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

var emailUnused = false;
var usernameUnused = false;
var passwordsValidityShowing = false;

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

  var emailRegex = RegExp(/^\w+([\.-]?(?=(\w+))\1)*@\w+([\.-]?(?=(\w+))\1)*(\.\w{2,3})+$/).test(email.value);

  if (
    username !== "" &&
    email.value !== "" &&
    emailRegex &&
    fName !== "" &&
    lName !== "" &&
    password1.value !== "" &&
    password2.value !== "" &&
    password1.value === password2.value &&
    emailUnused &&
    usernameUnused
  ) {
    bootstrap.Tooltip.getInstance(toolTip).disable();
    registerButton.removeAttribute("disabled");
  } else {
    bootstrap.Tooltip.getInstance(toolTip).enable();
    registerButton.setAttribute("disabled", "");
  }
}

function checkUsername(self) {
  var usernameHelpText = document.getElementById("id_username_helptext");
  fetch("checkTaken?username=" + self.target.value)
    .then((response) => response.text())
    .then((text) => {
      var status = JSON.parse(text)["used"];
      if (self.target.value !== "") {
        if (status === "true") {
          setUsedStyling("bad", self.target, usernameHelpText);
          usernameUnused = false;
          usernameHelpText.innerText = "That username is already in use";
        } else {
          usernameUnused = true;
          setUsedStyling("good", self.target, usernameHelpText);
          usernameHelpText.innerText = "That looks good";
        }
      } else {
        setUsedStyling("original", self.target, usernameHelpText);
        usernameHelpText.innerText = "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.";
        usernameUnused = false;
      }
      validateForm();
    });
  validateForm();
}

function checkEmail(self) {
  var emailHelpText = document.getElementById("id_email_helptext");
  var emailRegex = RegExp(/^\w+([\.-]?(?=(\w+))\1)*@\w+([\.-]?(?=(\w+))\1)*(\.\w{2,3})+$/).test(self.target.value);
  if (!emailRegex) {
    if (self.target.value === "") {
      emailUnused = false;
      setUsedStyling("original", self.target, emailHelpText);
      emailHelpText.innerText = "Required: Enter a email in the format example@example.com";
    } else {
      emailUnused = true;
      setUsedStyling("bad", self.target, emailHelpText);
      emailHelpText.innerText = "Email is not in the correct format, ex: example@example.com";
    }
  } else {
    fetch("checkTaken?email=" + self.target.value)
      .then((response) => response.text())
      .then((text) => {
        var status = JSON.parse(text)["used"];
        if (self.target.value !== "") {
          if (status === "true") {
            setUsedStyling("bad", self.target, emailHelpText);
            emailUnused = false;
            emailHelpText.innerText = "That email is already in use";
          } else if (emailRegex) {
            setUsedStyling("good", self.target, emailHelpText);
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
  if (password1.value !== "" && password2.value !== "") {
    if (password1.value !== password2.value) {
      setPasswordStyling("bad", password1, password2);
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
      setPasswordStyling("good", password1, password2);
    }
  }
  validateForm();
}
function setUsedStyling(used, input, helpText) {
  if (used === "bad") {
    input.classList.add("inputERR");
    input.classList.remove("inputGood");
    helpText.classList.add("helptextBad");
    helpText.classList.remove("helptext");
  } else if (used === "good") {
    input.classList.add("inputGood");
    input.classList.remove("inputERR");
    helpText.classList.remove("helptextBad");
    helpText.classList.add("helptext");
  } else {
    input.classList.remove("inputGood");
    input.classList.remove("inputERR");
    helpText.classList.remove("helptextBad");
    helpText.classList.add("helptext");
  }
}
function setPasswordStyling(used, input1, input2) {
  if (used === "bad") {
    input1.classList.add("inputERR");
    input1.classList.remove("inputGood");
    input2.classList.add("inputERR");
    input2.classList.remove("inputGood");
  } else if (used === "good") {
    input1.classList.add("inputGood");
    input1.classList.remove("inputERR");
    input2.classList.add("inputGood");
    input2.classList.remove("inputERR");
  }
}
