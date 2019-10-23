window.onload = () => {
  document.addEventListener("click", e => {
    if (e.target.closest(".svg-remove-simple")) {
      deleteNearestLi(e.target);
    }
    if (e.target.closest(".content")) {
      showMealSelector();
    }
    if (e.target.classList.contains("meal-selector")) {
      hideMealSelector();
    }
  });

  const deleteNearestLi = element => {
    const li = element.closest(".ingredient-item");
    if (li) li.parentNode.removeChild(li);
  };

  const showMealSelector = () => {
    const selectorElement = document.querySelector(".meal-selector");
    selectorElement.classList.remove("inactive");
    selectorElement.classList.add("active");
  };

  const hideMealSelector = () => {
    const selectorElement = document.querySelector(".meal-selector");
    selectorElement.classList.remove("active");
    selectorElement.classList.add("inactive");
  };
};
