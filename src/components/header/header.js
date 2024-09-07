import { DivComponent } from "../../common/div-component";

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.classList.add("header");
        this.el.innerHTML = `
            <a href="#">Поиск книг</a>
            <a href="#fovorites">Избранное</a>
        `;
        return this.el;
    }
}
