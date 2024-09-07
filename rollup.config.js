import scss from "rollup-plugin-scss";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
    input: "src/app.js",
    output: {
        dir: "dist",
        format: "iife",
    },
    plugins: [
        scss({ fileName: "bundle.css" }, nodeResolve()), // will output compiled styles to "bundle.css"
    ],
};
