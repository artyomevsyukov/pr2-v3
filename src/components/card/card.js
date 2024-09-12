import { DivComponent } from "../../common/div-component";
// import { Book } from "../../view/book";
import "./card.scss";

export class Card extends DivComponent {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    #addToFavorites() {
        this.appState.favorites.push(this.cardState);
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(
            (b) => b.key !== this.cardState.key
        );
    }
    // async loadBook(key) {
    // const res = await fetch(`https://openlibrary.org${key}`);
    // return res.json();
    // }

    async #openBook(event) {
        if (event.target.closest("button")) {
            return;
        }
        console.log("Карточка нажата: ", this.cardState);
        console.log("KEY: ", this.cardState.key);

        // const dataBook = await this.loadBook(this.cardState.key);
        // console.log(("DATABOOK: ", dataBook));
        console.log(
            "PUSH this.appState.book :",
            (this.appState.book = this.cardState)
        );

        window.location.hash = "#book";
    }

    render() {
        const existInFavorites = this.appState.favorites.find(
            (book) => book.key == this.cardState.key
        );

        // console.log("CARD this.cardState: ", this.cardState);
        this.el.classList.add("card");
        this.el.setAttribute("book-key", this.cardState.key);
        this.el.innerHTML = `
            <div class="card__cover">
                <img class="card__img" src="https://covers.openlibrary.org/b/olid/${
                    this.cardState.cover_edition_key
                }-M.jpg   " alt="Обложка книги">
            </div>
            <div class="card__desc">
                <div class="card__tag">${
                    this.cardState.subject
                        ? this.cardState.subject[0]
                        : "Не задано"
                }
                </div>
                <div class="card__name">${this.cardState.title}</div>
                <div class="card__author">${
                    this.cardState.author_name
                        ? this.cardState.author_name[0]
                        : "Не задано"
                }
                </div>
                <div class="card__footer">
                        <button class="card__btn-add ${
                            existInFavorites ? "card__btn-add_favorites" : ""
                        }">
                      ${
                          existInFavorites
                              ? '<img src="./static/favorites.svg">'
                              : '<img src="./static/favorites-white.svg">'
                      }
                            
                        </button>   
                </div>
            </div>
            `;

        if (existInFavorites) {
            this.el
                .querySelector("button")
                .addEventListener(
                    "click",
                    this.#deleteFromFavorites.bind(this)
                );
        } else {
            this.el
                .querySelector("button")
                .addEventListener("click", this.#addToFavorites.bind(this));
        }

        this.el.addEventListener("click", (event) => this.#openBook(event));

        const book = document.createElement("div");
        this.el.append(book);

        return this.el;
    }
}
