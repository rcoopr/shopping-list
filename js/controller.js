class Controller {
  constructor(options) {
    this.model = options.model;
    this.view = options.view;

    this.initList();
    this.initInput();
    this.initRemoveButtons();
  }

  initList() {
    this.view.renderSavedList();
  }

  initInput() {
    this.input = sel(".input");
    this.form = sel("form");

    this.form.addEventListener("submit", e => {
      e.preventDefault();

      let input = e.target[0];

      if (input.value) {
        this.view.addItem(input.value);
      }

      input.value = "";
    });
  }

  initRemoveButtons() {
    document.addEventListener("click", e => {
      if (e.target.closest(".destroy")) {
        this.deleteItem(e.target);
      }
    });
  }

  addItem(title) {
    this.model.insert({
      id: Date.now(),
      title,
      completed: false
    });
    this.view.setFooterVisibility();
  }

  deleteItem(HTMLElement) {
    this.model.remove(HTMLElement.dataset.id);
    this.view.removeParent(HTMLElement);
    this.view.setFooterVisibility();
  }
}
