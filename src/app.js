import "../static/global.scss";
import { MainView } from "./view/main";
import { Favorites } from "./view/favorites";

class App {
    routes = [
        { path: "", view: MainView },
        { path: "#fovorites", view: Favorites },
    ];

    appState = {
        favorites: [],
    };

    constructor() {
        window.addEventListener("hashchange", this.onChange.bind(this));
        this.route();
        this.updateActiveLink();
    }

    onChange() {
        this.route();
        this.updateActiveLink();
    }

    route() {
        console.log("APP rout location.hash: ", location.hash);

        if (this.currentView) {
            this.currentView.destroy();
        }
        const view = this.routes.find((r) => r.path === location.hash).view;
        this.currentView = new view(this.appState);
        this.currentView.render();
    }

    updateActiveLink() {
        const links = document.querySelectorAll(".header__link");

        const currentHash = window.location.hash || "#";

        // console.log(links);

        links.forEach((link) => {
            if (link.getAttribute("href") === currentHash) {
                link.classList.add("header__link_active");
            } else {
                link.classList.remove("header__link_active");
            }
        });

        // console.log("currentHash: ", currentHash);
    }
}

new App();
