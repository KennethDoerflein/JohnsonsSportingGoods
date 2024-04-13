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

  console.log(emailRegex);

  console.log(emailUnused);

  console.log(usernameUnused);

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
          setUsernameUsedStyling("bad");
          usernameUnused = false;
          usernameHelpText.innerText = "That username is already in use";
        } else {
          usernameUnused = true;
          setUsernameUsedStyling("good");
          usernameHelpText.innerText = "That looks good";
        }
      } else {
        setUsernameUsedStyling("original");
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
      setEmailUsedStyling("original");
      emailHelpText.innerText = "Required: Enter a email in the format example@example.com";
    } else {
      emailUnused = true;
      setEmailUsedStyling("bad");
      emailHelpText.innerText = "Email is not in the correct format, ex: example@example.com";
    }
  } else {
    fetch("checkTaken?email=" + self.target.value)
      .then((response) => response.text())
      .then((text) => {
        var status = JSON.parse(text)["used"];
        if (self.target.value !== "") {
          if (status === "true") {
            setEmailUsedStyling("bad");
            emailUnused = false;
            emailHelpText.innerText = "That email is already in use";
          } else if (emailRegex) {
            setEmailUsedStyling("good");
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
      password1.classList.add("inputERR");
      password2.classList.add("inputERR");
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
      password1.classList.remove("inputERR");
      password2.classList.remove("inputERR");
    }
  }
  validateForm();
}
function setEmailUsedStyling(used) {
  var email = document.getElementById("id_email");
  var emailHelpText = document.getElementById("id_email_helptext");
  if (used === "bad") {
    email.classList.add("inputERR");
    email.classList.remove("inputGood");
    emailHelpText.classList.add("helptextBad");
    emailHelpText.classList.remove("helptext");
  } else if (used === "good") {
    email.classList.add("inputGood");
    email.classList.remove("inputERR");
    emailHelpText.classList.remove("helptextBad");
    emailHelpText.classList.add("helptext");
  } else {
    email.classList.remove("inputGood");
    email.classList.remove("inputERR");
    emailHelpText.classList.remove("helptextBad");
    emailHelpText.classList.add("helptext");
  }
}
function setUsernameUsedStyling(used) {
  var username = document.getElementById("id_username");
  var usernameHelpText = document.getElementById("id_username_helptext");
  if (used === "bad") {
    username.classList.add("inputERR");
    username.classList.remove("inputGood");
    usernameHelpText.classList.add("helptextBad");
    usernameHelpText.classList.remove("helptext");
  } else if (used === "good") {
    username.classList.add("inputGood");
    username.classList.remove("inputERR");
    usernameHelpText.classList.remove("helptextBad");
    usernameHelpText.classList.add("helptext");
  } else {
    username.classList.remove("inputGood");
    username.classList.remove("inputERR");
    usernameHelpText.classList.remove("helptextBad");
    usernameHelpText.classList.add("helptext");
  }
}
