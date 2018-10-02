// Originally from here https://medium.com/tandemly/im-breaking-up-with-higher-order-components-44b0df2db052

// ScrollWatch - compose any component(s) that need
// to make use of the current 'x' and 'y' scroll position.
import React from 'react';
import PropTypes from 'prop-types';

export class ScrollWatch extends React.PureComponent {
  state = { x: 0, y: 0 };
  propTypes = { render: PropTypes.func.isRequired };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = e => {
    this.setState({
      x: window.scrollX,
      y: window.scrollY
    })
  };

  render() {
    const { x, y } = this.state;
    return this.props.render(x,y);
  }
}