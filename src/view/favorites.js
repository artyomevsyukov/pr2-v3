import { AbstractView } from "../common/view";
import onChange from "on-change";
import { Header } from "../components/header/header";
import { CardList } from "../components/cardlist/card-list";

export class Favorites extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle("Избранное");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        // console.log("main change appState: ", this.appState);
        if (path === "favorites") {
            this.render();
        }
    }

    render() {
        this.app.innerHTML = "";
        const main = document.createElement("div");
        main.classList.add("favorites");
        main.innerHTML = `
            <h1 class="card-list__title">Избранное</h1>
        `;
        main.append(
            new CardList(this.appState, {
                list: this.appState.favorites,
            }).render()
        );
        this.app.append(main);
        this.renderHeader();
    }
    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
