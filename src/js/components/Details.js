import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Shape = styled('div')`
  position: absolute;
  z-index: 999;
  left: 3rem;
  bottom: 2rem;
  color: rgba(0,0,0,0.4);
  font-family: 'Reenie Beanie', cursive;
  h1 {
    font-size: 2rem;
    margin-bottom: 0.8rem;
    margin-left: -1rem;
    letter-spacing: 1px;
  }
  p {
    margin: 0;
    margin-bottom: -0.2rem;
    font-size: 1.2rem;
  }
  a {
    text-decoration: none;
    color: inherit;
    font-weight: 600;
  }
`;

class Details extends React.PureComponent {

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

    return (<Shape className={cls.join(' ')} {...rest}>{children}</Shape>);
  }
}

export default Details;