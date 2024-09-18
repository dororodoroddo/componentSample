# 바닐라 컴포넌트 샘플

- 과제전형 내용(특정 기능 프레임워크 없이 자유롭게 구현)을 제거한 구현 내용 레포지터리
- 구현 기간 3일
- 트랜스파일러와 번들러를 사용하지 않고 시간상 구현하지 않았기 때문에 vs code 라이브 서버를 이용해 구동 (정해진 경로에 맞게 서버에 디플로이하면 구동 가능)
- 컴포넌트 사용 샘플은 없으므로 구동보다 코드를 보는게 좋습니다.

---

    ### 1.2. 구현 방향

    - 깔끔하고 좋은 코드를 작성하는 것도 매우 중요하나 바닐라 JS로 진행하는 과제이고 깔끔한 코드는 주변 사람과 함께 맞추어 나가는 것이지만 자바스크립트와 라이브러리의 구조를 이해하고 어려운 구조를 구현해내는 것은 각자의 역량으로 해내는 것이기 때문에 반응형 컴포넌트와 전역 스토어 구현에 집중하여 개발하였습니다.

---

    ## 2. 구현 사항
    ### 2.1. 컴포넌트형 구조

    - proxy를 이용하여 컴포넌트 상태와 전역 상태가 변경되면 해당 상태를 참조한 컴포넌트의 내부 컴포넌트를 다시 렌더링하도록 구현하였습니다.
    - 재렌더링 시, 전역 객체와의 연결을 끊어 메모리 누수를 방지했습니다.

    ### 2.2. 상태관리

    - flux 패턴의 전역 상태 관리로 데이터의 변화를 추적할 수 있도록 개발하였습니다.

    ### 2.3. UI 컴포넌트

    - 재사용 가능한 UI를 컴포넌트화하여 다양한 부분에서 재사용하고 디자인 시스템을 적용할 수 있도록 염두했습니다.
