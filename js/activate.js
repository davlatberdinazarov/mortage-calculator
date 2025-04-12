function toggleActive(inputWrapper) {
  let formControlEl = inputWrapper.querySelector(".form-control-group");
  let formIcon = inputWrapper.querySelector(".form-control-group-icon");

  formControlEl.classList.remove("active-border");
  formControlEl.classList.add("static-border");

  formIcon.classList.remove("active-bg");
  formIcon.classList.add("static-bg");
}

export default toggleActive;