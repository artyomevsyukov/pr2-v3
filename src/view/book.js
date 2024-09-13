import { AbstractView } from "../common/view";
import { Header } from "../components/header/header";
import onChange from "on-change";
import "./book.scss";

export class Book extends AbstractView {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
        this.setTitle(this.appState.book.title);
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
    }

    appStateHook(path) {
        // console.log("main change appState: ", this.appState);
        if (path === "favorites") {
            this.render();
        }
    }

    #addToFavorites() {
        console.log("ADD");
        this.appState.favorites.push(this.appState.book);
    }

    #deleteFromFavorites() {
        console.log("DELL");

        this.appState.favorites = this.appState.favorites.filter(
            (b) => b.key !== this.appState.book.key
        );
    }

    render() {
        console.log("this.appState:", this.appState);
        console.log("this.appState.book:", this.appState.book);

        const existInFavorites = this.appState.favorites.find(
            (book) => book.key == this.appState.book.key
        );
        console.log("existInFavorites: ", existInFavorites);

        this.app.innerHTML = "";
        const main = document.createElement("div");
        main.classList.add("book");
        main.innerHTML = `
            <h1 class="book__title">${this.appState.book.title}</h1>
            <div class="book-wrapper">
                <div class="book__cover">
                     <img class="book__img" src="https://covers.openlibrary.org/b/olid/${
                         this.appState.book.cover_edition_key
                     }-M.jpg   " alt="Обложка книги">
                </div>

                 <div class="book__info">
                    
                        <div class="book__author">
                        Автор : <span>${
                            this.appState.book.author_name
                                ? this.appState.book.author_name[0]
                                : "Не задано"
                        }</span>
                        
                        </div>
                        
                        <div class="book__tag">
                        Category : <span>${
                            this.appState.book.subject
                                ? this.appState.book.subject[0]
                                : "Не задано"
                        }</span>
                        
                         </div>

                        <div class="book__publication">
                            Первая публикация: ${
                                this.appState.book.first_publish_year
                                    ? this.appState.book.first_publish_year
                                    : "Не задано"
                            }
                        
                         </div>

                        <div class="book__page">
                            Число страниц: ${
                                this.appState.book.number_of_pages_median
                                    ? this.appState.book.number_of_pages_median
                                    : "Не задано"
                            }
                         </div>

                <div class="book-favorites">
                        <button class="book-favorites__btn-add ${
                            existInFavorites
                                ? "book-favorites__btn-add_favorites"
                                : ""
                        }">
                      ${
                          existInFavorites
                              ? "Убрать из избранного"
                              : "В избранное"
                      }
                            
                        </button>   
                </div>


                </div>
            </div>

            <div class="book__desc book-desc">
                   <div class="book-desc__title"> Описание: </div>
                   <div class="book-desc__body"> ${
                       this.appState.book._version_
                   } </div>
            </div>
            <div class="book__tag book-tag">
                  <div class="book-tag__title">  Теги: </div>

                    ${
                        this.appState.book.subject
                            ? this.appState.book.subject
                                  .slice(0, 4)
                                  .map((tag) => {
                                      return `<a href="#" class="book-tag__link">${tag}</a>`;
                                  })
                                  .join("")
                            : "Не задано"
                    }   
            </div>
        `;

        if (existInFavorites) {
            main.querySelector("button").addEventListener(
                "click",
                this.#deleteFromFavorites.bind(this)
            );
        } else {
            main.querySelector("button").addEventListener(
                "click",
                this.#addToFavorites.bind(this)
            );
        }

        this.app.append(main);

        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
