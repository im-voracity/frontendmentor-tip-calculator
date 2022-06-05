const buttons = Array.from(document.querySelectorAll(".percentage-button"));
const inputs = [
  document.querySelector(".bill-input"),
  document.querySelector(".custom"),
  document.querySelector(".people-number"),
];

const grabOutput = [
  document.querySelector(".input-tip-amount"),
  document.querySelector(".total-bill"),
];

const values = {
  bill: 0,
  tip: 0,
  people: 1,
};

const outputs = {
  tipAmount: 0,
  totalBill: 0,
};

const error = {
  subdiv: Array.from(document.querySelectorAll(".sub-div")),
};

const errortext = document.querySelector(".zero");

const custom = document.querySelector(".custom");

inputs.forEach((input) => input.addEventListener("keyup", handleChange));

function handleChange() {
  const { id } = this.dataset;
  values[id] = this.value;
  calc();
}

buttons.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector(".custom").value = "";

    buttons.forEach((item) => {
      item.classList.remove("selected");
      custom.classList.remove("error");
    });
    item.classList.add("selected");
    values.tip = e.target.value;

    calc();
  });
});

function calc() {
  if (
    isNaN(outputs.tipAmount) ||
    isNaN(values.people) ||
    isNaN(values.bill) ||
    isNaN(values.people)
  ) {
    Number(outputs.tipAmount);
    Number(values.bill);
    Number(values.tip);
    Number(values.people);
  }

  if (
    values.bill == "" ||
    values.bill == 0 ||
    values.tip == "" ||
    values.tip == 0 ||
    values.people < 1 ||
    values.people == ""
  ) {
    return;
  }

  outputs.tipAmount = (values.bill * (values.tip / 100)) / values.people;
  outputs.totalBill = values.bill / values.people + outputs.tipAmount;

  grabOutput[0].value = outputs.tipAmount.toFixed(2);
  grabOutput[1].value = outputs.totalBill.toFixed(2);
}

error.subdiv[0].addEventListener("focusout", (e) => {
  error.subdiv[0].classList.remove("foco");
  error.subdiv[0].classList.remove("error");

  if (values.bill == "" || values.bill == 0) {
    error.subdiv[0].classList.add("error");
  }
});

error.subdiv[1].addEventListener("focusout", (e) => {
  error.subdiv[1].classList.remove("foco");
  error.subdiv[1].classList.remove("error");
  errortext.classList.remove("error");

  if (values.people == "" || values.people < 1) {
    error.subdiv[1].classList.add("error");
    errortext.classList.add("error");
  }
});

custom.addEventListener("focusout", (e) => {
  custom.classList.remove("foco");
  custom.classList.remove("error");
  buttons.forEach((item) => {
    item.classList.remove("selected");
    custom.classList.remove("error");
  });

  if (
    values.tip == "" ||
    custom.value == "" ||
    values.tip == 0 ||
    custom.value == 0
  ) {
    custom.classList.add("error");
  }
});

document.querySelector(".reset-button").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("form").reset();
});

document.querySelector(".mt-link").addEventListener("click", (e) => {
  e.preventDefault();

  window.open(
    "https://matheustenorio.com?utm_source=tip-calculator&utm_medium=organic&utm_campaign=portfolio&utm_content=bottom-logo",
    "_blank"
  );
});

inputs[0].addEventListener("focusin", (e) => {
  error.subdiv[0].classList.add("foco");
});

inputs[1].addEventListener("focusin", (e) => {
  custom.classList.add("foco");
});

inputs[2].addEventListener("focusin", (e) => {
  error.subdiv[1].classList.add("foco");
});
