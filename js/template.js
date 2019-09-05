class Template {
    createListHTML(items) {
        return items.reduce((acc, item) =>
            acc + `
            <li class="task bkg-highlight no-hidden" data-id=${item.id}>
                <input class="toggle" type="checkbox">
                <h4>${item.title}</h4>
                <a href="#" class="destroy new" data-id=${item.id}>⨯</a>
            </li>
            `, '')
    }
}