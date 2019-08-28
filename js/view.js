function View(controller) {
    this.controller = controller;
    this.container = document.querySelector('taskList');
    this.container.innerText = controller.getModelTaskName();
    this.container.addEventListener('click', controller);
}

export {
    View
};