import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import "./card-list.scss";

export class CardList extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState;
    }
    render() {
        this.el.classList.add("card-list");

        if (this.parentState.loading) {
            this.el.innerHTML = `
            <h1 class="card-list__loading">Загрузка...</h1>
        `;
            return this.el;
        }

        const gridCard = document.createElement("div");
        gridCard.classList.add("card-list__grid");

        //render card
        this.parentState.list.forEach((book) => {
            gridCard.append(new Card(this.appState, book).render());
        });

        this.el.append(gridCard);

        return this.el;
    }
}
