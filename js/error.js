export function toggleError(inputWrapper, isError) {
  let formControlEl = inputWrapper.querySelector(".form-control-group");
  let formIcon = inputWrapper.querySelector(".form-control-group-icon");
  let errorMsg = inputWrapper.querySelector(".error-message");

  if (isError) {
    formControlEl.classList.add("error-border");
    formControlEl.classList.remove("static-border");

    formIcon.classList.add("error-bg");
    formIcon.classList.remove("static-bg");

    errorMsg.classList.remove("hidden");
  } else {
    formControlEl.classList.remove("error-border");
    formControlEl.classList.remove("active-border");
    formControlEl.classList.add("static-border");

    formIcon.classList.remove("error-bg");
    formIcon.classList.remove("active-bg");
    formIcon.classList.add("static-bg");

    errorMsg.classList.add("hidden");
  }
}
