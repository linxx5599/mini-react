// import { render, createElement } from "./React.js"
import ReatcDOM from "./react/core/ReactDom.js"
import React from "./react/core/React.js"

// const dom = createElement("div")
// dom.id = "app"
// const textNode =  createElement()
// textNode.nodeValue = "app_text"
// dom.appendChild(textNode)
// document.querySelector("#root").appendChild(dom)

// const App = createElement("div", { id: "app" }, "child1", "child2")
// render(App, document.querySelector("#root"))

const App = React.createElement("div", { id: "app" }, "child1", "child2")
ReatcDOM.createRoot(document.querySelector("#root")).render(App)