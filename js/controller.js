class Controller {
  constructor(options) {
    this.model = options.model;
    this.view = options.view;

    this.initList();
    this.initInput();
    this.initClickHandlers();
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
        this.delegateAddItems(input.value);
      }

      input.value = "";
    });
  }

  initClickHandlers() {
    document.addEventListener("click", e => {
      if (e.target.closest(".destroy")) {
        this.delegateDeleteId(e.target);
      }

      if (e.target.closest(".filter")) {
        this.delegateFilter(e.target.dataset.filter);
      }
    });
  }

  delegateAddItems(titles) {
    const titlesAsArray = asArray(titles);
    const newEntries = titlesAsArray.map(title => {
      const entry = {
        title,
        id: Date.now(),
        completed: false
      };
      return entry;
    });

    this.model.insert(newEntries);
    this.view.addItem(newEntries);
    this.view.setFooterVisibility();
  }

  delegateDeleteId(element) {
    const id = asArray(element.dataset.id);
    this.model.remove(id);
    this.view.removeParent(element);
    this.view.setFooterVisibility();
  }

  delegateFilter(filterType) {
    // filterType === "all" => remove all hidden
    // filterType === "active" => search for completed: false
    // filterType === "done" => search for completed: true

    const matching = this.model.search({ completed: false }, data =>
      console.log(data)
    );
  }
}
