import React from 'react';
import styled from 'react-emotion';
import {theme} from '../theme/Theme';

const Shape = styled('div')`
  transition: all 1.5s ease-out;
  transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
  position: absolute;
  top: 100px;
  white-space: nowrap;
`;

class Gallery extends React.PureComponent {

  static defaultProps = {};
  static propTypes    = {};

  state = {
    selectedIndex  : -1,
    selectedElement: null,
    left           : 0
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  onSelect = index => e => {
    let cardWidthSel = theme.habitat.cardWidth + theme.habitat.backgroundSizeSelected,
        cardWidth    = theme.habitat.cardWidth + theme.habitat.backgroundSize,
        leftSide     = index * cardWidth * -1,
        offSet       = leftSide + (window.innerWidth / 2) - (cardWidthSel / 2);

    this.setState({
      selectedIndex  : index,
      selectedElement: e.target,
      left           : offSet
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

    return (<Shape className={cls.join(' ')} {...rest}
                   style={{transform: `translateX(${this.state.left}px)`}}>{children}</Shape>);
  }
}

export default Gallery;