const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

var emailUnused = false;
var usernameUnused = false;

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
          setInputStyling("bad", self.target, usernameHelpText);
          usernameUnused = false;
          usernameHelpText.innerText = "That username is already in use";
        } else {
          usernameUnused = true;
          setInputStyling("good", self.target, usernameHelpText);
          usernameHelpText.innerText = "That looks good";
        }
      } else {
        setInputStyling("original", self.target, usernameHelpText);
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
      setInputStyling("original", self.target, emailHelpText);
      emailHelpText.innerText = "Required: Enter a email in the format example@example.com";
    } else {
      emailUnused = true;
      setInputStyling("bad", self.target, emailHelpText);
      emailHelpText.innerText = "Email is not in the correct format, ex: example@example.com";
    }
  } else {
    fetch("checkTaken?email=" + self.target.value)
      .then((response) => response.text())
      .then((text) => {
        var status = JSON.parse(text)["used"];
        if (self.target.value !== "") {
          if (status === "true") {
            setInputStyling("bad", self.target, emailHelpText);
            emailUnused = false;
            emailHelpText.innerText = "That email is already in use";
          } else if (emailRegex) {
            setInputStyling("good", self.target, emailHelpText);
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
    helpText.classList.add("helptext");
  }
}
