function Controller(model) {
    let self = this;
    this.model = model;

    this.handleEvent = e => {
        e.stopPropagation();
        switch (e.type) {
            case "click":
                self.clickHandler(e.target);
                break;
            default:
                console.log(e.target);
        }
    }

    this.getModelTaskName = () => self.model.tasks[0].name;

    this.clickHandler = (target) => {
        self.model.tasks = {
            name: "clicked",
            id: 0
        };
        target.innerText = self.getModelTaskName();
    }
}

export {
    Controller
};