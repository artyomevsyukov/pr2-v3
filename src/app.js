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
        window.addEventListener("hashchange", this.route.bind(this));
        this.route();
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
}

new App();
