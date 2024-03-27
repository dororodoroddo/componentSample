import ImageComponent from '../UI/ImageComponent.js';
import { LinearList } from '../UI/LinearList.js';
import TextComponent from '../UI/TextComponent.js';

// 헤더
export default function Header() {
  return LinearList({
    elementType: 'header',
    direction: 'horizontal',
    styles: {
      'justify-content': 'space-between',
      padding: '0 12px',
      background: '#ccf',
    },
    renderFunction: () => {
      return [
        ImageComponent({
          src: '/assets/imgs/data.png',
          alt: '로고',
          height: '48',
        }),
        TextComponent({
          elementType: 'h1',
          text: '가나다라마',
          font: 'bold-1',
        }),
      ];
    },
  });
}
