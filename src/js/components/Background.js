import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import {theme} from '../theme/Theme';

const Shape = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.15;
  width: ${theme.habitat.cardWidth + theme.habitat.backgroundSize}px;
  height: ${theme.habitat.cardHeight + theme.habitat.backgroundSize}px;
  background: transparent;
  overflow: hidden;
  padding: 6rem;
  text-align: center;
  white-space: normal;
  text-shadow: ${theme.shadows.textLight};
  img {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(${theme.habitat.backgroundSize - theme.habitat.backgroundSizeSelected}px, 0);
    mask-image: radial-gradient(ellipse at center, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 30%);
    -webkit-mask-image: radial-gradient(ellipse at center, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 30%);
  }
  h1 {
    position: relative;
    font-size: 1.8rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }
  p {
    position: relative;
    font-size: 1.2rem;
  }
`;

class Background extends React.PureComponent {

  static defaultProps = {};
  static propTypes = {
    open: PropTypes.bool
  };

  state = {
    isOpen: this.props.open
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {className=null, children, ...rest} = this.props;

    let cls = [''];
    cls.push(className);

    return (<Shape className={cls.join(' ')} {...rest}>{children}</Shape>);
  }
}

export default Background;