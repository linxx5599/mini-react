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

let nextFiber = null

function render(el, container) {
  nextFiber = {
    dom: container,
    props: {
      children: [el]
    }
  }
}

function workLoop(deadLine) {
  let shouldYield = false
  while (!shouldYield && nextFiber) {
    nextFiber = performFiber(nextFiber)
    shouldYield = deadLine.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function createDom(type) {
  return type === TEXT_ELEMENT ?
    document.createTextNode("") :
    document.createElement(type)
}

function updateProps(dom, props) {
  Object.keys(props).forEach(key => {
    dom[key] = props[key]
  })
}

let prevFiber = null
function performFiber(fiber) {
  const { children, ...props } = fiber.props;
  if (!fiber.dom) {
    //create dom 
    const dom = (fiber.dom = createDom(fiber.type))
    updateProps(dom, props)
    fiber.parent.dom.append(dom)
  }

  //转换链表 设置指针
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null,
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevFiber.sibling = newFiber
    }
    prevFiber = newFiber
  })
  if (fiber.child) {
    return fiber.child
  }
  if (fiber.sibling) {
    return fiber.sibling
  }
  return fiber.parent?.sibling
}

const React = {
  createElement,
  createTextNode,
  render
}
export default React