import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import debouce from 'lodash/debounce';

// Initial implementation from https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce

export class MouseWatch extends React.PureComponent {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  state = {x: 0, y: 0};

  componentDidMount () {
    this.componentEl = ReactDOM.findDOMNode(this); //eslint-disable-line react/no-find-dom-node
  }

  mouseMove = () => debouce((x, y) => {
    this.setState({x, y});
  }, 50);

  // TODO support touch
  // e.touches[0].pageX, e.touches[0].pageY
  handleMouseMove = e => {
    // To get mouse over screen use this
    // x: event.clientX,
    // y: event.clientY

    if (this.componentEl) {
      let scrollX = window.pageXOffset,
          scrollY = window.pageYOffset,
          offset  = this.componentEl.getBoundingClientRect();

      this.setState({
        x: e.pageX - offset.left - scrollX,
        y: e.pageY - offset.top - scrollY
      });
    }
  };

  handleMouseLeave = () => {
    this.setState({
      x: -1,
      y: -1
    });
  };

  handleMouseEnter = () => {
  };

  render () {
    return (
      <span onMouseMove={this.handleMouseMove}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}>
        {this.props.render(this.state)}
      </span>
    );
  }
}