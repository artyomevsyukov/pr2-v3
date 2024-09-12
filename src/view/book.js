import { AbstractView } from "../common/view";
import { Header } from "../components/header/header";

export class Book extends AbstractView {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
        this.setTitle(this.appState.book.title);
    }

    render() {
        console.log("this.appState:", this.appState);
        console.log("this.appState.book:", this.appState.book);
        this.app.innerHTML = "";
        const main = document.createElement("div");
        main.classList.add("book");
        main.innerHTML = `
            <h1 class="book__title">${this.appState.book.title}</h1>
            <div class="wrapper">
                <div class="book__cover">
                     <img class="book__img" src="https://covers.openlibrary.org/b/olid/${this.appState.book.cover_edition_key}-L.jpg   " alt="Обложка книги">
                </div>
                 <div class="book__desc">
                     Автор
                </div>
            </div>
        `;

        this.app.append(main);

        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
