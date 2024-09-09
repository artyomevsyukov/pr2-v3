import { DivComponent } from "../../common/div-component";
import "./header.scss";

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.classList.add("header");
        this.el.innerHTML = `
            <img class="header__logo" src="./static/logo.svg" alt="Логотип">
            <div class="header__menu">
                <a class="header__link header__link_active" href="#">
                    <img class="header__link-img" src="./static/search.svg" alt="Поиск">
                    Поиск книг
                </a>
                <a class="header__link" href="#fovorites">
                    <img class="header__link-img" src="./static/favorites.svg" alt="Избранное">
                    Избранное
                </a>
                <div class="header__counter">${this.appState.favorites.length}</div>
            </div>

        `;
        return this.el;
    }
}
