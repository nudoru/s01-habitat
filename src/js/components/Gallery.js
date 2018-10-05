import React from 'react';
import _ from 'lodash';
import styled from 'react-emotion';
import {theme} from '../theme/Theme';
import {Animate, TweenGroup} from "./Animate";
import {Expo, TweenMax} from 'gsap';

// Problem: Quickly switching focused items is jittery
//transition: all 2s ease-out;
//   transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
const Shape = styled('div')`
  position: absolute;
  top: 100px;
  white-space: nowrap;
`;

class Gallery extends React.PureComponent {

  static defaultProps = {};
  static propTypes    = {};

  state = {
    selectedIndex  : -1,
    focusedIndex   : 0,
    focusedCardLeft: 0
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('keydown', _.throttle(this.handleKeyPress, 100));
    this.setState({
      focusedIndex   : 0,
      focusedCardLeft: this.getCardCenterValue(0)
    });
  }

  componentWillUnmount() {
    // window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        this.decrementFocusItem();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        this.incrementFocusItem();
        break;
    }
  };

  incrementFocusItem() {
    let currentIdx = this.state.focusedIndex,
        boundary   = React.Children.count(this.props.children) - 1;

    if (currentIdx++ < boundary) {
      this.onFocus(currentIdx)();
    }
  }

  decrementFocusItem() {
    let currentIdx = this.state.focusedIndex,
        boundary   = 0;

    if (currentIdx-- > boundary) {
      this.onFocus(currentIdx)();
    }
  }

  getCardCenterValue(index) {
    let cardWidth = theme.habitat.cardWidth + theme.habitat.backgroundSize,
        leftSide  = index * cardWidth * -1;
    return leftSide + (window.innerWidth / 2) - (cardWidth / 2);
  }

  getSelectedCardCenterValue(index) {
    let cardWidthSel = theme.habitat.cardWidth + theme.habitat.backgroundSizeSelected,
        cardWidth    = theme.habitat.cardWidth + theme.habitat.backgroundSize,
        leftSide     = index * cardWidth * -1;
    return leftSide + (window.innerWidth / 2) - (cardWidthSel / 2);
  }

  onFocus = index => e => {
    this.setState({
      focusedIndex   : index,
      selectedIndex  : -1,
      focusedCardLeft: this.getCardCenterValue(index)
    });
  };

  onSelect = index => e => {
    this.setState({
      selectedIndex  : index,
      focusedIndex   : index,
      focusedCardLeft: this.getSelectedCardCenterValue(index)
    });
  };

  _slideArtTween = to => ({target}) => {
    return TweenMax.to(target, 3, {
      x   : to,
      ease: Expo.easeOut
    });
  };

  render() {
    const {className = null, children: originalChildren, ...rest} = this.props;

    let cls = [''];
    cls.push(className);

    const children = React.Children.map(originalChildren, (child, idx) => React.cloneElement(child, {
        key     : idx,
        index   : idx,
        selected: idx === this.state.selectedIndex,
        onSelect: this.onSelect
      })
    );

    //style={{transform: `translateX(${this.state.focusedCardLeft}px)`}}

    return (<TweenGroup tween={this._slideArtTween(this.state.focusedCardLeft)}>
      <Shape className={cls.join(' ')} {...rest}>{children}</Shape>
    </TweenGroup>);
  }
}

export default Gallery;