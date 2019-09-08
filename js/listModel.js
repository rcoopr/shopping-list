class ListModel {
  constructor(store) {
    this.name = store;
    window.localStorage.setItem(
      this.name,
      JSON.stringify([
        {
          title: "Peppers",
          id: Date.now(),
          completed: false
        }
      ])
    );
    this.items = JSON.parse(window.localStorage.getItem(this.name));
  }

  getItems() {
    return this.items;
  }

  insert(itemsToAdd) {
    console.log(this.items);
    this.items.push(...itemsToAdd);
    console.log(this.items);
  }

  remove(query, callback) {
    const items = this.items;
    const filteredList = items.filter(item => item.id != query);

    this.items = filteredList;

    if (callback) callback();
  }

  // search(query, callback) {
  //     const list = this.items;
  //     let i, k;

  //     callback(list.filter(item => {
  //         for (i in query) {
  //             if (query[k] !== item[k]) return false;
  //         }
  //         return true;
  //     }));
  // }
}
