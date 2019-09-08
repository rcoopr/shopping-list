class ListModel {
  constructor(store) {
    this.name = store;
    this.getLocalStorage = () => {
      return JSON.parse(window.localStorage.getItem(this.name));
    };
    this.setLocalStorage = list => {
      localStorage.setItem(this.name, JSON.stringify(list));
    };
  }

  insert(itemsAsArray) {
    const items = this.getLocalStorage();
    items.push(...itemsAsArray);
    this.setLocalStorage(items);
  }

  remove(idAsArray) {
    const items = this.getLocalStorage();
    let i;

    const filteredList = items.filter(item => {
      for (i in idAsArray) {
        if (item.id == idAsArray[i]) return false;
      }
      return true;
    });

    this.setLocalStorage(filteredList);
  }

  search(query, callback) {
    const list = this.getLocalStorage();
    let i;

    callback(
      list.filter(item => {
        for (i in query) {
          if (item[i] !== query[i]) return false;
        }
        return true;
      })
    );
  }
}
