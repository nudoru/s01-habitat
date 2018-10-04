// Using Feather icons https://feathericons.com/
import React from 'react';
import styled from 'react-emotion';

const Shape = styled('div')`
  position: relative;
  display: inline-block;
  color: inherit;
  svg {
    margin: 0;
    display: block;
  }`;

const SVG = ({name = '', viewBox= '0 0 24 24', width = '24', height = '24', children}) =>
  <svg xmlns="http://www.w3.org/2000/svg" width={width}
              height={height} viewBox={viewBox} fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className={'feather feather-' + name}>{children}</svg>;

const Flag = (props) => <SVG {...props} name='flag'>
  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
  <line x1="4" y1="22" x2="4" y2="15"/>
</SVG>;

const ChevronDown = (props) => <SVG {...props} name='chevron-down'>
  <polyline points="6 9 12 15 18 9"/>
</SVG>;

const ChevronUp = (props) => <SVG {...props} name='chevron-up'>
  <polyline points="18 15 12 9 6 15"/>
</SVG>;

const ChevronLeft = (props) => <SVG {...props} name='chevron-left'>
  <polyline points="15 18 9 12 15 6"/>
</SVG>;

const ChevronRight = (props) => <SVG {...props} name='chevron-right'>
  <polyline points="9 18 15 12 9 6"/>
</SVG>;

const Box = (props) => <SVG {...props} name='box'>
  <path
    d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"/>
  <polyline points="2.32 6.16 12 11 21.68 6.16"/>
  <line x1="12" y1="22.76" x2="12" y2="11"/>
</SVG>;

const Package = (props) => <SVG {...props} name='package'>
  <path
    d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"/>
  <polyline points="2.32 6.16 12 11 21.68 6.16"/>
  <line x1="12" y1="22.76" x2="12" y2="11"/>
  <line x1="7" y1="3.5" x2="17" y2="8.5"/>
</SVG>;

const Check = (props) => <SVG {...props} name='check'>
  <polyline points="20 6 9 17 4 12"/>
</SVG>;

const Circle = (props) => <SVG {...props} name='circle'>
  <circle cx="12" cy="12" r="10"/>
</SVG>;

const Square = (props) => <SVG {...props} name='square'>
  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
</SVG>;

const X = (props) => <SVG {...props} name='x'>
  <line x1="18" y1="6" x2="6" y2="18"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</SVG>;

const Hash = (props) => <SVG {...props} name='hash'>
  <line x1="4" y1="9" x2="20" y2="9"/>
  <line x1="4" y1="15" x2="20" y2="15"/>
  <line x1="10" y1="3" x2="8" y2="21"/>
  <line x1="16" y1="3" x2="14" y2="21"/>
</SVG>;

const Book = (props) => <SVG {...props} name='book'>
  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
</SVG>;

const BookOpen = (props) => <SVG {...props} name='book-open'>
  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
</SVG>;

const Bookmark = (props) => <SVG {...props} name='bookmark'>
  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
</SVG>;

const Award = (props) => <SVG {...props} name='award'>
  <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
</SVG>;


const Icon = (props) => {
  switch (props.name) {
    case "flag":
      return <Flag {...props}/>;
    case "chevron-down":
      return <ChevronDown {...props}/>;
    case "chevron-up":
      return <ChevronUp {...props}/>;
    case "chevron-left":
      return <ChevronLeft {...props}/>;
    case "chevron-right":
      return <ChevronRight {...props}/>;
    case "box":
      return <Box {...props}/>;
    case "package":
      return <Package {...props}/>;
    case "check":
      return <Check {...props}/>;
    case "circle":
      return <Circle {...props}/>;
    case "square":
      return <Square {...props}/>;
    case "x":
      return <X {...props}/>;
    case "hash":
      return <Hash {...props}/>;
    case "book":
      return <Book {...props}/>;
    case "book-open":
      return <BookOpen {...props}/>;
    case "bookmark":
      return <Bookmark {...props}/>;
    case "award":
      return <Award {...props}/>;
    default:
      return <span>Icon, {props.name}?</span>
  }
};

export const SVGIcon = ({name, ...rest}) => <Shape {...rest}><Icon name={name}/></Shape>;