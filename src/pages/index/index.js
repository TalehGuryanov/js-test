import "./index.scss";
import Inputmask from "inputmask";

const main = document.querySelector("[data-main]");
const form = document.querySelector("[data-form]");
const formFields = document.querySelectorAll("[data-form-field]");
const formFieldErrors = document.querySelectorAll("[data-form-field-error]");
const resultText = document.querySelector("[data-result-text]");
const resultAction = document.querySelector("[data-result-action]");

const emailFiledIndex = Array.from(formFields).findIndex(
  (field) => field.name === "email",
);

const isEmailValid = () => {
  if (emailFiledIndex !== -1) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formFields[emailFiledIndex].value)) {
      formFieldErrors[emailFiledIndex].innerText = "Wrong email format";
      formFieldErrors[emailFiledIndex].setAttribute("data-show", "true");
      return false;
    } else {
      formFieldErrors[emailFiledIndex].setAttribute("data-show", "false");
      return true;
    }
  }

  return true;
};

const isFilledFields = () => {
  return Array.from(formFields).every((field, index) => {
    if (!field.value) {
      formFieldErrors[emailFiledIndex].innerText = "This field is required";
      formFieldErrors[index].setAttribute("data-show", "true");
    }
    return field.value;
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!isFilledFields()) {
    return;
  }

  if (!isEmailValid()) {
    return;
  }

  const formData = new FormData(form);

  try {
    main.setAttribute("data-status", "pending");

    const response = await fetch("http://localhost:9090/api/registration", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw await response.json();
    }

    const result = await response.json();

    main.setAttribute("data-status", "resolved");
    resultText.innerHTML = result.message;
  } catch (error) {
    main.setAttribute("data-status", "rejected");
    resultText.innerHTML = error.message;
  }
});
resultAction.addEventListener("click", () => {
  formFields.forEach((field) => {
    field.value = "";
  });

  main.removeAttribute("data-status");
});

const initPhoneMask = () => {
  const phoneFiledIndex = Array.from(formFields).findIndex(
    (field) => field.name === "phone",
  );

  if (phoneFiledIndex !== -1) {
    const im = new Inputmask("+375 (99) 999-99-99", {
      placeholder: "+375 (__) ___-__-__",
    });

    im.mask(formFields[phoneFiledIndex]);
  }
};

const resetFilersError = () => {
  formFields.forEach((field, index) => {
    field.addEventListener("change", () => {
      formFieldErrors[index].setAttribute("data-show", "false");
    });
  });
};

initPhoneMask();
resetFilersError();
