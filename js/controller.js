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
    this.view.setCount(this.model.count());
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
        this.delegateDeleteId(e.target, true);
      }

      if (e.target.closest(".filter")) {
        this.delegateFilter(e.target.dataset.filter);
      }

      if (e.target.closest(".toggle")) {
        const li = e.target.closest(".task");
        this.toggleCompletedItem(li.dataset.id);
      }

      if (e.target.closest(".clear-done")) {
        this.clearCompletedItems();
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
    this.view.setCount(this.model.count());
    this.view.setFooterVisibility();
  }

  delegateDeleteId(id, byElement = false) {
    const idAsArray = byElement ? asArray(id.dataset.id) : asArray(id);
    const element = sel(`[data-id="${id}"]`) || id;

    this.model.remove(idAsArray);
    this.view.removeParent(element);
    this.view.setCount(this.model.count());
    this.view.setFooterVisibility();
  }

  toggleCompletedItem(id) {
    this.model.toggleCompleted(id);
  }

  delegateFilter(filterType) {
    const activeA = sel(".filter-active");
    const allA = sel(".filter-all");
    const doneA = sel(".filter-done");

    switch (filterType) {
      // Show all items
      case "all":
        this.model.search({}, items => {
          items.forEach(item => {
            this.delegateShowItems(item.id);
          });
        });
        allA.classList.add("filter-in-use");
        activeA.classList.remove("filter-in-use");
        doneA.classList.remove("filter-in-use");
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

        allA.classList.remove("filter-in-use");
        activeA.classList.add("filter-in-use");
        doneA.classList.remove("filter-in-use");
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
        allA.classList.remove("filter-in-use");
        activeA.classList.remove("filter-in-use");
        doneA.classList.add("filter-in-use");
        break;

      default:
        allA.classList.remove("filter-in-use");
        activeA.classList.remove("filter-in-use");
        doneA.classList.remove("filter-in-use");
        break;
    }
  }

  delegateShowItems(id) {
    this.view.show(id);
  }

  delegateHideItems(id) {
    this.view.hide(id);
  }

  clearCompletedItems() {
    this.model.search({ completed: true }, items => {
      items.forEach(item => {
        this.delegateDeleteId(item.id);
      });
    });
    this.view.setCount(this.model.count());
  }
}
