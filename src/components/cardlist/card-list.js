import { DivComponent } from "../../common/div-component";
import "./card-list.scss";

export class CardList extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState;
    }
    render() {
        this.el.classList.add("card-list");
        this.el.innerHTML = `
            <h1 class="card-list__title">Найдено книг – ${this.parentState.numFound}</h1>
        `;

        return this.el;
    }
}
