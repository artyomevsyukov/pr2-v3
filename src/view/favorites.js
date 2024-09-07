import { AbstractView } from "../common/view";
import { Header } from "../components/header/header";

export class Favorites extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.setTitle("Избранное");
    }

    render() {
        this.app.innerHTML = "";
        const main = document.createElement("div");
        main.classList.add("favorites");
        main.innerHTML = "Избранное";
        this.app.append(main);
        this.renderHeader();
    }
    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
