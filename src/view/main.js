import { AbstractView } from "../common/view";
import onChange from "on-change";
import { Header } from "../components/header/header";
import { Search } from "../components/search/search";
import { CardList } from "../components/cardlist/card-list";
import { Pagination } from "../components/pagination/pagination";

export class MainView extends AbstractView {
    state = {
        list: [],
        loading: false,
        numFound: 0,
        searchQuery: undefined,
        offset: 0,
        offsetLimit: 10,
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
        // console.log("main change appState: ", this.appState);
        if (path === "favorites") {
            this.render();
        }
    }

    async stateHook(path) {
        // console.log("PATH:", path, "Запустился stateHooj c PATH:", path);
        if (path === "searchQuery" || path === "offset") {
            this.state.loading = true;
            const data = await this.loadList(
                this.state.searchQuery,
                this.state.offset,
                this.state.offsetLimit
            );
            // const dataBook = await this.loadList("/works/OL16791644W");
            // console.log(("DATABOOK: ", dataBook));

            // console.log("this.parentState.offset: ", this.state.offset);
            // console.log("this.state.numFound:", this.state.numFound);
            this.state.loading = false;
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
            // console.log("this.state.list: ", this.state.list);
            // console.log("this.state.numFound: ", this.state.numFound);
        }
        if (path === "loading" || path === "list") {
            this.render();
        }
    }

    async loadList(q, offset, limit) {
        try {
            const res = await fetch(
                `https://openlibrary.org/search.json?q=${q}&offset=${offset}&limit=${limit}`
            );
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`);
            }
            return res.json();
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
        }
    }

    async loadCard(key) {
        const res = await fetch(`https://openlibrary.org/${key}`);
        return res.json();
    }

    render() {
        // console.log("START RENDER MAIN");
        // console.log("this.state.numFound: ", this.state.numFound);
        const main = document.createElement("div");
        main.classList.add("main");
        main.innerHTML = `
            <h1 class="card-list__title">Найдено книг – ${this.state.numFound}</h1>
        `;
        main.append(new Search(this.state).render());
        main.append(new CardList(this.appState, this.state).render());
        main.append(new Pagination(this.state).render());
        this.app.innerHTML = "";
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
