function FluxOrigin() {
  return {
    debug: false,
    stateSetMethods: {},
    state: {},
    actions: {},
    dispatch(type, argument) {
      // dispatch 함수의 반환 타입이 async로 추적되지 않도록 즉시 실행 함수 사용
      (async () => {
        let debugData;
        if (this.debug) {
          debugData = {
            type,
            state: '',
          };
        }

        let result;
        if (/^async__/.test(type)) {
          if (this.debug) {
            debugData.state = 'call';
            // 타임 라인 디버깅을 위한 수집기
            this.debugStack.push(debugData);
            console.log(debugData);
          }
          result = await this.actions[type](argument);
        } else {
          result = this.actions[type](argument);
        }

        if (this.debug) {
          debugData.state = 'update';
          debugData.beforePayload = this.state[result.key];
          debugData.payload = result.payload;
          this.debugStack.push(debugData);
          console.log(debugData);
        }

        this.state[result.key] = result.payload;
      })();
    },
    // 최초 초기화
    init(initialState = {}, actions = {}, { debug = false }) {
      if (debug) {
        this.debug = debug;
        this.debugStack = [];
      }
      const state = initialState();
      this.actions = actions;
      this.state = new Proxy(state, {
        set: (target, key, value, reciever) => {
          if (target[key] !== value) {
            Object.values(this.stateSetMethods[key]).forEach((methods) => {
              methods(key, value);
            });
          }
          return Reflect.set(target, key, value, reciever);
        },
      });
      for (const stateKey in state) {
        this.stateSetMethods[stateKey] = {};
      }
      // 한 개의 스토어를 공유하므로 init 함수는 지워줌
      this.init = undefined;
    },
  };
}

const Flux = FluxOrigin();

export default Flux;
