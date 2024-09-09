import "bundle.css";
import { AbstractView } from "../common/view";
import { Header } from "../components/header/header";
import { Search } from "../components/search/search";

export class MainView extends AbstractView {
    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0,
    };

    constructor(appState) {
        super();
        this.appState = appState;
        this.setTitle("Поиск книг");
    }

    render() {
        this.app.innerHTML = "";
        const main = document.createElement("div");
        main.classList.add("main");
        main.innerHTML = "Тест";
        this.app.append(main);
        main.append(new Search(this.appState, this.state).render());
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
