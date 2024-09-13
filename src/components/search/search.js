import { DivComponent } from "../../common/div-component";
import "./search.scss";

export class Search extends DivComponent {
    constructor(parentState) {
        super();

        this.parentState = parentState;
    }
    search() {
        const value = this.el.querySelector("input").value;
        this.parentState.searchQuery = value;
    }
    render() {
        this.el.classList.add("search");
        this.el.innerHTML = `
            <input class="search__input" type="text" name="search" placeholder="Найти книгу или автора...."  value=${
                this.parentState.searchQuery
                    ? this.parentState.searchQuery
                    : "harry potter"
            }>
            <button class="search__btn">
                <img src="./static/search-white.svg" alt="Поиск">
            </button>
        `;
        this.el
            .querySelector(".search__btn")
            .addEventListener("click", this.search.bind(this));
        this.el.querySelector("input").addEventListener("keydown", (e) => {
            if (e.code == "Enter") {
                this.search();
            }
        });

        return this.el;
    }
}
