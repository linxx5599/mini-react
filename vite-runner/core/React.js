// const el = {
//   type: "div",
//   props: {
//     id: "app",
//     children: []
//   }
// }
const TEXT_ELEMENT = "TEXT_ELEMENT"
export default {
  createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child => {
          return typeof child === "string" ? this.createTextNode(child) : child
        })
      }
    }
  },
  createTextNode(text) {
    return {
      type: TEXT_ELEMENT,
      props: {
        nodeValue: text,
        children: []
      }
    }
  },
  render(el, container) {
    const dom = el.type === TEXT_ELEMENT ? document.createTextNode("") : document.createElement(el.type)
    const { children, ...props } = el.props;
    Object.keys(props).forEach(key => {
      dom[key] = props[key]
    })
    children.forEach(child => {
      this.render(child, dom)
    })
    container.append(dom)
  }
}