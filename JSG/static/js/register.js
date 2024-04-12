const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

document.getElementById("id_username").onkeyup = validateForm;
document.getElementById("id_email").onkeyup = validateForm;
document.getElementById("id_first_name").onkeyup = validateForm;
document.getElementById("id_last_name").onkeyup = validateForm;
document.getElementById("id_password1").onkeyup = validateForm;
document.getElementById("id_password2").onkeyup = validateForm;

function validateForm(self) {
  var username = document.getElementById("id_username").value;
  var email = document.getElementById("id_email");
  var fName = document.getElementById("id_first_name").value;
  var lName = document.getElementById("id_last_name").value;
  var password1 = document.getElementById("id_password1");
  var password2 = document.getElementById("id_password2");

  var toolTip = document.getElementById("ToolTipRegister");
  var loginButton = document.getElementById("registerButton");

  var emailRegex = RegExp(/^\w+([\.-]?(?=(\w+))\1)*@\w+([\.-]?(?=(\w+))\1)*(\.\w{2,3})+$/).test(email.value);

  if (username !== "" && email.value !== "" && emailRegex && fName !== "" && lName !== "" && password1.value !== "" && password2.value !== "" && password1.value === password2.value) {
    bootstrap.Tooltip.getInstance(toolTip).disable();
    loginButton.removeAttribute("disabled");
  } else {
    bootstrap.Tooltip.getInstance(toolTip).enable();
    loginButton.setAttribute("disabled", "");
  }
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

  if (email.value !== "") {
    if (!emailRegex) {
      email.classList.add("inputERR");
      email.setCustomValidity("Email is not formatted correctly.");
      email.reportValidity();
    } else {
      email.setCustomValidity("");
      email.classList.remove("inputERR");
    }
  }
}
