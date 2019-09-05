class View {
    constructor(options) {
        this.model = options.model;
        this.template = options.template;

        this.listContainer = sel('.item-list');
        this.footer = sel('.footer');
    }

    addItem(val) {
        const newItem = [{
            title: val,
            id: Date.now(),
            completed: false
        }];

        this.model.addItemToModel(newItem);
        this.appendList(newItem);
        this.attachRemoveEvents();
        this.setFooterVisibility();
    }

    deleteItem(id) {
        this.model.remove(id);
    }

    removeParent(HTMLElement) {
        return () => {
            this.deleteItem(HTMLElement.dataset.id);
            if (HTMLElement.parentNode.parentNode) {
                HTMLElement.parentNode.parentNode.removeChild(HTMLElement.parentNode)
            }
            this.setFooterVisibility();
        }
    }

    appendList(items) {
        const newItemsHTML = this.template.createListHTML(items);
        this.listContainer.insertAdjacentHTML('beforeend', newItemsHTML);
    }

    renderSavedList(callback) {
        const items = this.model.getItems();
        const listHTML = this.template.createListHTML(items);
        this.listContainer.innerHTML = listHTML;
        this.setFooterVisibility();

        if (callback) callback();
    }

    attachRemoveEvents() {
        const buttons = document.querySelectorAll('.destroy');
        if (buttons) {
            const newButtons = [...buttons].filter((button) => button.classList.contains('new'));

            if (newButtons) {
                newButtons.forEach((button) => {
                    button.classList.remove('new');
                    button.addEventListener('click', this.removeParent(button));
                });
            }
        }
    }

    setFooterVisibility() {
        const task = sel('.task.no-hidden');
        if (task) {
            this.footer.style.display = 'block';
        } else {
            this.footer.style.display = 'none';
        }
    }
}