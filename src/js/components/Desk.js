import React from 'react';
import styled from 'react-emotion';

const DeskImg = require('../../img/desk.png');

const Shape =  styled('div')`
  position: absolute;
  width: 100vw;
  bottom: -10px;
  left: 0;
  text-align:center;
  z-index: 99;
`;

class Desk extends React.PureComponent {

  static defaultProps = {};
  static propTypes = {};

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {className=null, children, ...rest} = this.props;

    let cls = [''];
    cls.push(className);

    return (<Shape className={cls.join(' ')} {...rest}><img src={DeskImg} alt='A modern desk and chair' /></Shape>);
  }
}

export default Desk;