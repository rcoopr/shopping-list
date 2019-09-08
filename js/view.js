class View {
  constructor(options) {
    this.model = options.model;
    this.template = options.template;

    this.listContainer = sel(".item-list");
    this.footer = sel(".footer");
  }

  addItem(entries) {
    this.appendList(entries);
    // this.attachRemoveEvents();
    this.setFooterVisibility();
  }

  removeParent(HTMLElement) {
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
    const items = this.model.getLocalStorage();
    const listHTML = this.template.createListHTML(items);
    this.listContainer.innerHTML = listHTML;
    this.setFooterVisibility();

    if (callback) callback();
  }

  show(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    li.classList.remove("hidden");
  }

  hide(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    li.classList.add("hidden");
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
