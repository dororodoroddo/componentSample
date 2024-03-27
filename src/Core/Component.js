import Flux from './Flux.js';
let componentId = 0;
// 사람들이 자주 사용하는 함수 형식을 사용하도록 사용성 개선
const Component = (params) => {
  return new ComponentOrigin(params);
};

// 간단한 고정 텍스트 엘리먼트 생성 함수
export function SimpleElement(type = 'div', options = {}) {
  const { className, id, css, attributes, textContent, styles, properties } =
    options;
  const element = document.createElement(type);
  if (textContent) {
    element.textContent = textContent;
  }

  id && (element.id = id);
  className && (element.className = className);
  css && (element.style.cssText = css);

  for (const property in properties) {
    element[property] = properties[property];
  }

  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }

  for (const style in styles) {
    element.style[style] = styles[style];
  }

  return element;
}

// 메인 생성자 함수
function ComponentOrigin(params) {
  this.__component__id = ++componentId;
  // 초기화
  const {
    element,
    id,
    className,
    state = {},
    globalKeys = [],
    css,
    properties = {},
    attributes = {},
    renderFunction = () => '',
  } = params;
  this.isRender = false;
  this.isSync = false;
  this.element = element;
  this.renderFunction = renderFunction;
  this.isWaitRender = false;
  this.globalKeys = new Set(globalKeys);
  this.childComponents = [];

  // null, undefined, ''로 할당해도 문자열로 형변환 되어 어트리뷰트를 생성하기 떄문에 단축 할당으로 존재할 때에만 할당
  id && (element.id = id);
  className && (element.className = className);
  css && (element.style.cssText = css);

  for (const property in properties) {
    element[property] = properties[property];
  }

  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }

  for (const stateKey in this.state) {
    if (this.globalKeys.has(stateKey)) {
      throw new Error('state and global state cannot share the same key');
    }
  }

  // 상태 주입
  const renderState = new Set();
  this.state = new Proxy(state, {
    get: (target, key, reciever) => {
      if (this.isRender) {
        renderState.add(key);
      }
      return Reflect.get(target, key, reciever);
    },
    set: (target, key, value, reciever) => {
      if (this.globalKeys.has(key) && !this.isSync) {
        throw new Error('cannot set on global state');
      }
      if (target[key] !== value && renderState.has(key)) {
        this.reserveRender();
      }
      return Reflect.set(target, key, value, reciever);
    },
  });

  // 전역객체 주입
  for (const key of globalKeys) {
    const setMethod = (stateKey, value) => {
      this.isSync = true;
      this.state[stateKey] = value;
      this.isSync = false;
    };
    try {
      Flux.stateSetMethods[key][this.__component__id] = setMethod;
      setMethod(key, Flux.state[key]);
    } catch (e) {
      if (e.name === 'TypeError') {
        throw new Error(`'${key}' does not exist in the global state.`);
      } else {
        throw e;
      }
    }
  }

  this.reserveRender();
}

//// 공통으로 사용될 수 있는 메서드는 프로토타입으로 지정하여 메모리 절약
// 스크립트가 모두 실행된 이후 렌더링 되도록 예약
ComponentOrigin.prototype.reserveRender = async function () {
  if (!this.isWaitRender) {
    this.isWaitRender = true;
    await Promise.resolve();
    this.isWaitRender = false;

    for (const childComponent of this.childComponents) {
      childComponent.detatchGlobal();
    }
    this.render();
  }
};

// 렌더링 함수
ComponentOrigin.prototype.render = function () {
  this.isRender = true;
  this.element.textContent = '';
  this.childComponents = [];

  const childs = this.renderFunction(this.state);

  const appendElement = (el) => {
    if (el instanceof ComponentOrigin) {
      this.element.append(el.element);
      this.childComponents.push(el);
    } else {
      this.element.append(el);
    }
  };

  if (childs instanceof Array) {
    for (const child of childs) {
      appendElement(child);
    }
  } else {
    appendElement(childs);
  }
  this.isRender = false;
};

// 메모리 누수 방지를 위해 참조 해제
ComponentOrigin.prototype.detatchGlobal = async function () {
  for (const childComponent of this.childComponents) {
    childComponent.detatchGlobal();
  }
  for (const key of this.globalKeys) {
    delete Flux.stateSetMethods[key][this.__component__id];
  }
};

export default Component;
