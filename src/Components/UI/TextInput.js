import { SimpleElement } from '../../Core/Component.js';

// 글자형 인풋
export default function TextInput({
  // 전화번호 이메일 등 텍스트와 유사한 그룹도 사용을 위함
  type = 'text',
  id,
  className,
  attributes = {},
  styles = {},
  onchange = () => {},
  onkeyup = () => {},
  onkeydown = () => {},
  title = '',
  disabled = false,
  value = '',
  placeholder = '',
  _properties,
}) {
  const properties = {
    ..._properties,
    onchange,
    onkeyup,
    onkeydown,
    value,
    placeholder,
  };

  const element = SimpleElement('input', {
    id,
    className,
    title,
    type,
    css: `
      padding: 5px 12px;
      border: 1px solid #000;
      margin: 2px;
    `,
    styles,
    properties,
    attributes,
  });

  element.disabled = disabled;

  return element;
}
