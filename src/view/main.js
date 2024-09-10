import { AbstractView } from "../common/view";
import onChange from "on-change";
import { Header } from "../components/header/header";
import { Search } from "../components/search/search";
import { CardList } from "../components/cardlist/card-list";

export class MainView extends AbstractView {
    state = {
        list: [],
        loading: false,
        numFound: 0,
        searchQuery: undefined,
        offset: 0,
    };

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle("Поиск книг");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path) {
        console.log("main change appState: ", this.appState);
        if (path === "favorites") {
            this.render();
        }
    }

    async stateHook(path) {
        console.log("PATH:", path, "Запустился stateHooj c PATH:", path);
        if (path === "searchQuery") {
            this.state.loading = true;
            const data = await this.loadList(
                this.state.searchQuery,
                this.state.offset
            );

            this.state.loading = false;
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
            console.log("this.state.list: ", this.state.list);
            console.log("this.state.numFound: ", this.state.numFound);
        }
        if (path === "loading" || path === "list") {
            this.render();
        }
    }

    async loadList(q, offset) {
        const res = await fetch(
            `https://openlibrary.org/search.json?q=${q}&offset=${offset}`
        );
        return res.json();
    }

    render() {
        console.log("this.state.numFound: ", this.state.numFound);
        const main = document.createElement("div");
        main.classList.add("main");
        // main.innerHTML = "Тест";
        main.append(new Search(this.state).render());
        main.append(new CardList(this.appState, this.state).render());
        this.app.innerHTML = "";
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
