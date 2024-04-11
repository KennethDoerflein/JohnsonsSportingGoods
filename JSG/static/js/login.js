const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

document.getElementById("id_username").onkeyup = validateForm;
document.getElementById("id_password").onkeyup = validateForm;

function validateForm() {
  var username = document.getElementById("id_username").value;
  var password = document.getElementById("id_password").value;
  var toolTip = document.getElementById("ToolTipLogin");
  var loginButton = document.getElementById("loginButton");
  if (username !== "" && password !== "") {
    bootstrap.Tooltip.getInstance(toolTip).disable();
    loginButton.removeAttribute("disabled");
  } else {
    bootstrap.Tooltip.getInstance(toolTip).enable();
    loginButton.setAttribute("disabled", "");
  }
}
