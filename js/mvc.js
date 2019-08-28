// HELPERS

/**
 * Shortcut for querySelector
 *
 * @param {string} selector CSS Selector
 * @returns {HTMLElement}
 */
function sel(selector) {
    return document.querySelector(selector);
}

/**
 * Shortcut for addEventListener
 *
 * @param {Element} target Element to add listener to
 * @param {string} event Event type (eg 'click', 'load')
 * @param {function()} callback Function to call when event is fired
 */
function $on(target, event, callback) {
    target.addEventListener(event, callback);
}

/**
 * @param {string} s String to escape
 * @returns {string} Escaped string with safe characters
 */
const escapeForHTML = s => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');

/**
 * @param {HTMLElement} element 
 * @returns {number} id of list item
 */
const itemId = element => parseInt(element.parentNode.dataset.id || element.parentNode.parentNode.dataset.id, 10);

// END HELPERS
// MODEL

class List {
    constructor(dbName, callback) {
        let items;
        const localStorage = window.localStorage;

        this.getLocalStorage = () => {
            return items || JSON.parse(localStorage.getItem(dbName) || '[]');
        }

        this.setLocalStorage = (list) => {
            localStorage.setItem(dbName, JSON.stringify(items = list));
        }

        if (callback) callback();
    }

    /**
     * Filter items back on a query
     *
     * @param {Object} query Condition for filtering
     * @param {function()} [callback] Optional, called after query completed
     * 
     * @example
     * db.search({completed: true}, data => { filtered data })
     */
    search(query, callback) {
        const list = this.getLocalStorage();
        let i;

        callback(list.filter(item => {
            for (i in query) {
                if (query[k] !== item[k]) return false;
            }
            return true;
        }));
    }

    /**
     * Add item to the list
     *
     * @param {string} item
     * @param {Function} [callback] Optional, called after item is inserted
     */
    insert(item, callback) {
        const list = this.getLocalStorage();
        list.push(item);
        this.setLocalStorage(list);

        if (callback) callback();
    }

    /**
     * Remove items from list based on query
     *
     * @param {Object} query
     * @param {function()} [callback] Optional, called after items are removed
     */
    remove(query, callback) {
        const list = this.getLocalStorage();
        let i;

        const filteredList = list.filter(item => {
            for (i in query) {
                if (query[k] !== item[k]) return true;
            }
            return false;
        });

        this.setLocalStorage(filteredList);

        if (callback) callback();
    }
}

// END MODEL
// TEMPLATE

class Template {
    /**
     * Provide HTML for list of items
     *
     * @param {Array} items
     * @returns {string} HTML content for entire list
     * 
     * @example
     * view.showItems({
     *      id: 1,
     *      name: "Item Description",
     *      completed: false,
     * })
     */
    itemList(items) {
        return items.reduce((acc, item) => acc + `
        <li class="${item.completed ? 'completed' : ''} task bkg-highlight" data-id=${item.id}>
            <input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}>
            <h4>${escapeForHTML(item.name)}</h4>
            <a href="#" class="destroy" data-id=${item.id}>⨯</a>
        </li>
        `, '');
    }
}

// VIEW

class View {
    constructor(template) {
        this.template = template;
        this.input = sel('input');
        this.form = sel('form');
        this.taskList = sel('.task-list');
        this.footer = sel('.footer');
        $on(this.form, 'submit', e => {
            e.preventDefault();

            if (input.value) {
                addItem(input.value);
            }

            input.value = "";
        })
    }

    showItems(items) {
        this.taskList.innerHTML = this.template.itemList(items);
    }

    removeItem(id) {
        const element = sel(`[data-id="${id}"]`);

        if (element) this.taskList.removeChild(element);
    }

    setVisibilityFooter(items) {
        this.footer.style.display = (items.length > 0 ? 'block' : 'hidden');
    }
}

// END VIEW
// CONTROLLER

class Controller {
    constructor(list, view) {
        this.list = list;
        this.view = view;
    }

    addItem(name) {
        this.list.insert({
            id: Date.now(),
            name,
            completed: false
        }, () => {
            //
        });
    }

    removeItem(id) {
        this.list.remove({
            id
        }, () => {
            this.update();
            this.view.removeItem(id);
        })
    }

    setView() {
        this.update();
    }

    update(items) {
        this.view.setVisibilityFooter(items);
    }
}

// END CONTROLLER
// APP

const list = new List('shopping-list');
const template = new Template();
const view = new View(Template);

const controller = new Controller(list, view);

const setView = () => controller.setView();

$on(window, 'load', setView);