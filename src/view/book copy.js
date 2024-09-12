import { AbstractView } from "../common/view";
import { Header } from "../components/header/header";

export class Book extends AbstractView {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
        this.setTitle(this.cardState.title);
    }

    render() {
        this.app.innerHTML = "";
        const main = document.createElement("div");
        main.classList.add("book");
        main.innerHTML = `
            <h1 class="book__title">${this.cardState.title}</h1>
        `;
        // main.append(
        //     new Book(this.appState, {
        //         list: this.appState.favorites,
        //     }).render()
        // );
        // this.app.append(main);

        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
