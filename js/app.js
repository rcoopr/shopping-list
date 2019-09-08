$on(window, "load", function() {
  let model = new ListModel("shopping-list");
  let view = new View({
    model: model,
    template: new Template()
  });

  let controller = new Controller({
    model: model,
    view: view
  });
});
