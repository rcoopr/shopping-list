class Controller {
    constructor(options) {
        this.model = options.model;
        this.view = options.view;

        this.initList();
        this.initInput();
    }

    initList() {
        this.view.renderSavedList(() => {
            this.view.attachRemoveEvents();
        });
    }

    initInput() {
        this.input = sel('.input');
        this.form = sel('form');

        this.form.addEventListener('submit', e => {
            e.preventDefault();

            let input = e.target[0];

            if (input.value) {
                this.view.addItem(input.value);
            }

            input.value = "";
        });
    }

    addItem(title) {
        this.model.insert({
            id: Date.now(),
            title,
            completed: false
        }, () => {
            this.view.clearInput();
        })
    }
}