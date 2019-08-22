window.onload = function () {
    const tasks = [];
    // const idList = localStorage.getItem(idList) || [0];
    const idList = [0];

    const input = document.querySelector('input');
    const form = document.querySelector('form');
    const taskList = document.querySelector('.taskList');
    const footer = document.querySelector('.footer');

    // const getClass = selector => document.querySelectorAll(${selector});

    const createTask = (name, id) => `
    <li class="task bkg-highlight" data-id=${id}>
        <input class="toggle" type="checkbox">
        <h4>${name}</h4>
        <a href="#" id="destroy-${id}" class="destroy" data-id=${id}>⨯</a>
    </li>
    `

    function addTask(name) {
        id = idList[idList.length - 1] + 1; // TODO: refactor
        idList.push(id);

        const newTask = createTask(name, id); // TODO: Potential for maliscious code?
        taskList.insertAdjacentHTML('beforeend', newTask);

        const button = document.getElementById(`destroy-${id}`);
        button.addEventListener('click', destroy.bind(this, button.parentNode, id), false);

        tasks.push({
            name: name,
            id: id
        });
        checkToggleFooter();
    }


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (input.value) {
            addTask(input.value);
        }

        input.value = "";
    });


    function destroy(parentNode, id) {
        parentNode.remove();
        taskIndex = tasks.findIndex(o => o.id === id);
        tasks.splice(taskIndex, 1);
        console.log(tasks.length);
        checkToggleFooter();
    }

    function checkToggleFooter() {
        if (tasks.length === 0) {
            footer.style.display = 'none';
        } else {
            footer.style.display = 'block';
        }
    }

}