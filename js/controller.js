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

      if (e.target.closest(".toggle")) {
        const li = e.target.closest(".task");
        this.toggleCompletedItem(li.dataset.id);
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

  toggleCompletedItem(id) {
    this.model.toggleCompleted(id);
  }

  delegateFilter(filterType) {
    // filterType === "done" => search for completed: true

    switch (filterType) {
      // Show all items
      case "all":
        this.model.search({}, items => {
          items.forEach(item => {
            this.delegateShowItems(item.id);
          });
        });
        break;

      // Search for {completed: true} + hide them
      // Search for {completed: false} + show them
      case "active":
        this.model.search({ completed: true }, items => {
          items.forEach(item => {
            this.delegateHideItems(item.id);
          });
        });

        this.model.search({ completed: false }, items => {
          items.forEach(item => {
            this.delegateShowItems(item.id);
          });
        });
        break;

      // Search for completed items + hide them
      // Search for incomplete + show them
      case "done":
        this.model.search({ completed: false }, items => {
          items.forEach(item => {
            this.delegateHideItems(item.id);
          });
        });

        this.model.search({ completed: true }, items => {
          items.forEach(item => {
            this.delegateShowItems(item.id);
          });
        });
        break;

      default:
        break;
    }
  }

  delegateShowItems(id) {
    this.view.show(id);
  }

  delegateHideItems(id) {
    this.view.hide(id);
  }
}
