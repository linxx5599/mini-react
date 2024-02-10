// const el = {
//   type: "div",
//   props: {
//     id: "app",
//     children: []
//   }
// }
const TEXT_ELEMENT = "TEXT_ELEMENT"

function createTextNode(text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === "string" ? createTextNode(child) : child
      })
    }
  }
}

function render(el, container) {
  const dom = el.type === TEXT_ELEMENT ? document.createTextNode("") : document.createElement(el.type)
  const { children, ...props } = el.props;
  Object.keys(props).forEach(key => {
    dom[key] = props[key]
  })
  children.forEach(child => {
    render(child, dom)
  })
  container.append(dom)
}

const React = {
  createElement,
  createTextNode,
  render
}
export default React