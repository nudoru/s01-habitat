import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import {theme} from '../theme/Theme';

const Shape = styled('div')`
  position: relative;
  width: ${theme.habitat.cardWidth}px;
  height: ${theme.habitat.cardHeight}px;
  background-color: #fff;
  box-shadow: ${theme.shadows.dropShadow.xl};
  border-radius: ${theme.radii[1]};
  overflow: hidden;
`;

class Card extends React.PureComponent {
  static defaultProps = {};
  static propTypes = {
    background: PropTypes.string
  };

  state = {};

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

export default Card;