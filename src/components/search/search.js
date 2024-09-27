import { DivComponent } from "../../common/div-component";
// import { debounce } from '../../core/utils/debounce';

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

        this.el.querySelector("input").addEventListener(
            "input",
            this.debounce(() => this.debounceSearch(), 500) // Привязываем контекст с помощью bind
        );

        return this.el;
    }

    debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    debounceSearch() {
        let input = document.querySelector(".search__input").value;
        console.log("input: ", input);
        const query = input;
        if (query) {
            // this.searchQuery(query, 0, 5); // Отправляем запрос на сервер
            this.parentState.searchQuery = query;
            input = "";
        }
    }

    async searchQuery(query, offset, limit) {
        try {
            const res = await fetch(
                `https://openlibrary.org/search.json?q=${query}&offset=${offset}&limit=${limit}`
            );
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`);
            }
            const data = await res.json();
            console.log("Результаты поиска:", data); // Вывод результатов поиска в консоль
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
        }
    }
}
