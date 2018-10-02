import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import styled from 'react-emotion';
import Card from './Card';
import Background from './Background';
import {theme} from '../theme/Theme';
import {NOOP} from "../utils/componentUtils";

//left: ${theme.habitat.backgroundSize / 2}px;
const CardStyle = css`
  transition: all .5s ease-out;
  transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
  z-index: 2;
  transform: translate(${theme.habitat.backgroundSize / 2}px, ${theme.habitat.backgroundSize / 2}px);
  cursor: pointer;
`;

//left: ${theme.habitat.backgroundSizeSelected / 2}px;
const CardStyleSelected = css`
  transform: translate(${theme.habitat.backgroundSizeSelected / 2}px, ${theme.habitat.backgroundSize / 2}px);
  box-shadow: none;
  opacity: 0;
`;

const BackgroundStyle = css`
  opacity: 0.35;
  transition: all 1s ease-out;
  transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
  z-index: 1;
  width: ${theme.habitat.cardWidth + theme.habitat.backgroundSize}px;
  height: ${theme.habitat.cardHeight + theme.habitat.backgroundSize}px;
  background: transparent;
  overflow: hidden;
  mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 50%,rgba(0,0,0,0) 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 50%,rgba(0,0,0,0) 70%);
  img {
    transition: all 1s ease-out;
    transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
    position: relative;
    transform: translate(${theme.habitat.backgroundSize - theme.habitat.backgroundSizeSelected}px, 0);
  }
`;

const BackgroundStyleSelected = css`
  opacity: 1;
  width: ${theme.habitat.cardWidth + theme.habitat.backgroundSizeSelected}px;
  img {
    transform: translate(0,0);
  }
`;

const Shape = styled('div')`
  transition: all 1s ease-out;
  transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
  text-align: center;
  display: inline-block;
  position: relative;
  width: ${theme.habitat.cardWidth + theme.habitat.backgroundSize}px;
`;

const ShapeSelected = css`
width: ${theme.habitat.cardWidth + theme.habitat.backgroundSizeSelected}px;
`;

const ArtContext = React.createContext({});

class Art extends React.PureComponent {

  static ACard = ({children, ...rest}) =>
    <ArtContext.Consumer>{({select, selected, index}) => {
      let cls = [CardStyle];
      if (selected) {
        cls.push(CardStyleSelected);
      }
      return <Card onClick={select(index)}
                   className={cls.join(' ')} {...rest}>{children}</Card>
    }}
    </ArtContext.Consumer>;

  static ABackground = ({children, ...rest}) =>
    <ArtContext.Consumer>{({selected}) => {
      let cls = [BackgroundStyle];
      if (selected) {
        cls.push(BackgroundStyleSelected);
      }
      return <Background
                   className={cls.join(' ')} {...rest}>{children}</Background>
    }}
    </ArtContext.Consumer>;

    // <Background className={BackgroundStyle} {...rest}>{children}</Background>;

  static defaultProps = {
    selected: false,
    index   : 0,
    onSelect: NOOP
  };

  static propTypes = {
    selected: PropTypes.bool,
    index   : PropTypes.number,
    onSelect: PropTypes.func
  };

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const {className = null, children, onSelect, selected, index, ...rest} = this.props;

    let cls = [''];
    cls.push(className);

    if(selected) {
      cls.push(ShapeSelected);
    }

    return (
      <ArtContext.Provider
        value={{select: onSelect, selected: selected, index: index}}>
        <Shape className={cls.join(' ')} {...rest}>{children}</Shape>
      </ArtContext.Provider>
    );
  }
}

export default Art;