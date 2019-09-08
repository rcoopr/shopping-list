class View {
  constructor(options) {
    this.model = options.model;
    this.template = options.template;

    this.listContainer = sel(".item-list");
    this.footer = sel(".footer");
  }

  addItem(values) {
    let vals;
    if (values.constructor === String) {
      vals = [values];
    } else {
      vals = [...values];
    }

    let newItems = vals.map(val => {
      const entry = {
        title: val,
        id: Date.now(),
        completed: false
      };
      return entry;
    });

    this.appendList(newItems);
    // this.attachRemoveEvents();
    this.setFooterVisibility();
  }

  deleteItem(id) {
    this.model.remove(id);
  }

  removeParent(HTMLElement) {
    this.deleteItem(HTMLElement.dataset.id);

    const li = HTMLElement.closest(".task");
    if (li) {
      li.parentNode.removeChild(li);
    }
  }

  appendList(items) {
    const newItemsHTML = this.template.createListHTML(items);
    this.listContainer.insertAdjacentHTML("beforeend", newItemsHTML);
  }

  renderSavedList(callback) {
    const items = this.model.getItems();
    const listHTML = this.template.createListHTML(items);
    this.listContainer.innerHTML = listHTML;
    this.setFooterVisibility();

    if (callback) callback();
  }

  setFooterVisibility() {
    const task = sel(".task.no-hidden");
    if (task) {
      this.footer.style.display = "block";
    } else {
      this.footer.style.display = "none";
    }
  }
}
