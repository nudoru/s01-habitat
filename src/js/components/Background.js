import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';




const Shape = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
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