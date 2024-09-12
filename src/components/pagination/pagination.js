import { DivComponent } from "../../common/div-component";
import "./pagination.scss";

export class Pagination extends DivComponent {
    constructor(parentState) {
        super();
        this.parentState = parentState;
    }

    loadPrevPage() {
        console.log("this.parentState.offset: ", this.parentState.offset);
        if (this.parentState.offset >= this.parentState.offsetLimit) {
            this.parentState.offset -= this.parentState.offsetLimit;
        }
        return;
    }

    loadNextPage() {
        console.log("this.parentState.offset: ", this.parentState.offset);
        if (
            this.parentState.offset + this.parentState.offsetLimit <
            this.parentState.numFound
        ) {
            this.parentState.offset += this.parentState.offsetLimit;
        }
        return;
    }

    render() {
        this.el.classList.add("pagination");
        this.el.innerHTML = `
            <button class="pagination__btn pagination__prevPage" id="prevPage">Предыдущая страница</button>
            <button class="pagination__btn pagination__nextPage" id="nextPage">Следующая страница</button>    
        `;

        this.el
            .querySelector(".pagination__prevPage")
            .addEventListener("click", this.loadPrevPage.bind(this));
        this.el
            .querySelector(".pagination__nextPage")
            .addEventListener("click", this.loadNextPage.bind(this));

        return this.el;
    }
}
