import { addBtn, addCloseButtons, list, myTodoInput } from "./dom-utils";
import { validateButton, validateInput } from "./validators";

function init() {
  addBtn.disabled = true;
  addCloseButtons();
  addCheckedListener();
  addBtn.addEventListener("click", newTodoElement);
  myTodoInput.addEventListener("input", validateButton);
}

function addCheckedListener() {
  list.addEventListener("click", (ev) => {
    const target = ev.target as HTMLElement | null;
    if (target && target.tagName === "LI") {
      target.classList.toggle("checked");
    }
  });
}

// Create a new list item when clicking on the "Add" button
function newTodoElement() {
  const listElement = document.createElement("li");
  const inputValue = document.querySelector<HTMLInputElement>("#myInput")
    ?.value;

  //check that input is not empty
  if (!inputValue) {
    alert("You must write something!");
  } else {
    const validation = validateInput(inputValue);
    if (validation.isValid) {
      const inputTextContent = document.createTextNode(inputValue);
      //add Text to List Element
      listElement.appendChild(inputTextContent);
      resetInput();
      document.getElementById("myUL")?.appendChild(listElement);
      addCloseButtons();
    } else {
      alert(validation.message);
    }
  }
}

function resetInput() {
  myTodoInput.value = "";
  validateButton();
}

init();
