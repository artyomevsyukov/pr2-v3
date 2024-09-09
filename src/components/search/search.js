import { DivComponent } from "../../common/div-component";

export class Search extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState;
    }

    render() {
        this.el.classList.add("search");
        this.el.innerHTML = `
        SEARCH
        `;
        return this.el;
    }
}
