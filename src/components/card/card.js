import { DivComponent } from "../../common/div-component";
import "./card.scss";

export class Card extends DivComponent {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    #addToFavorites() {
        this.appState.favorites.push(this.cardState);

        console.log("add");
        console.log("this.cardState PUSH: ", this.cardState);
        console.log("this.appState.favorites: ", this.appState.favorites);
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(
            (b) => b.key !== this.cardState.key
        );

        // console.log("DELETE");
        // console.log("this.cardState FILTER: ", this.cardState);
        // console.log("this.appState.favorites: ", this.appState.favorites);
        // console.log("this: ", this);
    }

    render() {
        const existInFavorites = this.appState.favorites.find(
            (book) => book.key == this.cardState.key
        );

        // console.log("CARD this.cardState: ", this.cardState);
        this.el.classList.add("card");
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

        return this.el;
    }
}
