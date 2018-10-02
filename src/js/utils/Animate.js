import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {compose, identity} from 'ramda';
import TransitionGroupPlus from 'react-transition-group-plus';
import {NOOP, omit, getDOMElements} from './componentUtils';

/*
Wrapper for GreenSock Animations and React components. Animations persist between
updates as long as the element isn't recreated (looking at you styled-components).

NOTES:
...

Borrowed ideas from https://github.com/azazdeaz/react-gsap-enhancer

TODO

- Add 'set' props to Animate container
- pause handled enter / leave tweens
- create wrapper object for each tween target so I don't get dom el's all the time


BUGS

*/

const CSS_NO_TRANSITION = {
  transition: 'none !important'
};

//----------------------------------------------------------------------------------------------------------------------
// PARENT
//----------------------------------------------------------------------------------------------------------------------

export class Animate extends React.PureComponent {
  componentDidMount() {
    const {start} = this.props;

    if (start) {
      this.startTween = start({
        target: ReactDOM.findDOMNode(this), //eslint-disable-line react/no-find-dom-node
        props : this.props
      });
    }
  }

  componentWillUnmount() {
    if (this.startTween) {
      this.startTween.kill();
      this.startTween = null;
    }
  }

  render() {
    const {
            transitionMode,
            deferLeavingComponentRemoval,
            children: originalChildren,
            start,
            ...childProps
          } = this.props;

    let {component} = this.props;

    // RTG+ performs the animations in a <span> which won't animate, so need to
    // wrap in a <div> if no other component is specified
    if (start && !component) {
      component = <div/>;
    }

    let rtg = (<TransitionGroupPlus
      transitionMode={transitionMode}
      deferLeavingComponentRemoval={deferLeavingComponentRemoval}
    >
      {originalChildren}
    </TransitionGroupPlus>);

    if (component) {
      return React.cloneElement(component, {}, rtg);
    }

    return rtg;

  }
}

// https://github.com/cheapsteak/react-transition-group-plus#usage
Animate.defaultProps = {
  transitionMode              : 'out-in',
  deferLeavingComponentRemoval: false,
  component                   : null,
  start                       : null
};

// Anything other than these will be sent to children
Animate.propTypes = {
  transitionMode              : PropTypes.string,
  deferLeavingComponentRemoval: PropTypes.bool,
  component                   : PropTypes.object,
  start                       : PropTypes.func
};

//----------------------------------------------------------------------------------------------------------------------
// GROUP
//----------------------------------------------------------------------------------------------------------------------

export class TweenGroup extends React.PureComponent {

  static defaultProps = {
    __applyNoTransition: false,
    immediate          : true,      // run tween on mount or just on update
    paused             : false,
    forceUpdate        : false,
    component          : <div/>
  };

  static propTypes = {
    __applyNoTransition: PropTypes.bool,
    __tweenID          : PropTypes.number,
    immediate          : PropTypes.bool,
    component          : PropTypes.object,
    paused             : PropTypes.bool,
    forceUpdate        : PropTypes.bool,
    start              : PropTypes.func,
    enter              : PropTypes.func,
    tween              : PropTypes.func,
    tweenCallback      : PropTypes.func,
    leave              : PropTypes.func
  };

  constructor(props) {
    super(props);
    this.cachedDomAttrs = [];
    this.tweenTargets   = [];
    this.activeTweens   = [];
    this.enterTweens    = [];
    this.leaveTweens    = [];
    this.tweenDidChange = false;
  }

  componentWillAppear(cb) {
    this._performWillEnterAnimation(cb);
  }

  componentDidAppear() {
    this._onComponentDidMount();
  }

  componentWillEnter(cb) {
    this._performWillEnterAnimation(cb);
  }

  componentDidEnter() {
    this._onComponentDidMount();
  }

  // Due to RTG+, cDid/WillEnter serve this function
  componentDidMount() {
  }

  _onComponentDidMount() {
    // Wait a tick for DOM els to become available if called before they are
    setTimeout(() => {
      this._killEnterTweens();
      this._performStartAttrs();
      if(this.props.immediate) {
        this._saveDomAttrs();
        this._performAnimation();
      }
    }, 0); //this.props.delayBeforeRun
  }

  componentWillUpdate(nextProps) {
    this._killEnterTweens(); // If still entering and it gets an update
    if(this.props.immediate) {
      this._restoreDomAttrs();
    }

    this.tweenDidChange = nextProps.tween !== this.props.tween;
  }

  componentDidUpdate() {
    this._saveDomAttrs();
    this._performAnimation();
  }

  componentWillLeave(cb) {
    if (this.props.leave) {
      this._killAllTweens();
      this.leaveTweens = this._callExternalTweenCreator(this.props.leave, cb);
    } else {
      cb();
    }
  }

  componentDidLeave() {
  }

  componentWillUnmount() {
    this._killAllTweens();
  }

  _saveDomAttrs() {
    let domEls = getDOMElements(this.tweenTargets);

    this.cachedDomAttrs = domEls.reduce((acc, c) => {
      let attrs = {};
      Object.keys(c.attributes).forEach(idx => {
        let attr = c.attributes[idx];
        if (attr) {
          attrs[attr.name] = attr.value;
        }
      });
      acc.push(attrs);

      if (!this.props.forceUpdate) {
        c._gsTweenID = null;
      }

      c._gsTransform = null;

      return acc;
    }, []);
  }

  _restoreDomAttrs() {
    let domEls = getDOMElements(this.tweenTargets);

    domEls.forEach((el, i) => {
      let savedAttrs = this.cachedDomAttrs[i] || {};
      Object.keys(savedAttrs).forEach(attr => {
        el.setAttribute(attr, savedAttrs[attr]);
      });
    });
  }

  _performWillEnterAnimation(cb) {
    if (this.props.enter) {
      // Wait a tick for DOM els to become available if called before they are
      setTimeout(() => {
        this.enterTweens = this._callExternalTweenCreator(this.props.enter, cb);
      }, 0);

    } else {
      cb();
    }
  }

  _performStartAttrs() {
    if (this.props.start) {
      // Wait a tick for DOM els to become available if called before they are
      setTimeout(() => {
        this._callExternalTweenCreator(this.props.start);
      }, 0);
    }
  }

  _performAnimation() {
    // Did change on update
    if (this.tweenDidChange || this.props.forceUpdate) {
      this._invalidateActiveTweens();
    }

    if (this.activeTweens.length) {
      this._attachTween();
    } else if (this.props.tween) {
      this.activeTweens = this._callExternalTweenCreator(this.props.tween, this.props.tweenCallback);
    } else {
      this._killActiveTweens();
    }
  }

  // test for !document.body.contains(tween.target)
  _attachTween = () => {
    this.activeTweens.forEach((tween, i) => {
      let time     = tween.time();
      let reversed = tween.reversed();

      tween
        .invalidate()
        .restart(false, true)
        .time(time, true);

      if (this.props.paused) {
        tween.pause(null, true);
      }
      if (reversed) {
        tween.reverse(null, true);
      }
    });
  };

  _killAllTweens() {
    this._killEnterTweens();
    this._killActiveTweens();
    this._killLeaveTweens();
  }

  _killEnterTweens() {
    this.enterTweens.forEach(t => {
      t.seek(t.duration(), false).pause().kill();
    });
    this.enterTweens = [];
  }

  _invalidateActiveTweens() {
    this.activeTweens.forEach(t => {
      t.invalidate();
    });
    this.activeTweens = [];
  }

  _killActiveTweens() {
    this.activeTweens.forEach(t => {
      t.kill();
    });
    this.activeTweens = [];
  }

  _killLeaveTweens() {
    this.leaveTweens.forEach(t => {
      t.seek(t.duration(), false);
      t.kill();
    });
    this.leaveTweens = [];
  }

  _callExternalTweenCreator(func, callBack = NOOP) {
    let res = func({
      target      : getDOMElements(this.tweenTargets),
      props       : this.props,
      callBack    : callBack,
      activeTweens: this.activeTweens
    });

    if (Array.isArray(res)) {
      return res;
    }
    return [res];
  }

  render() {
    const {children: originalChildren, component, __applyNoTransition, ...childProps} = this.props;

    let cleanedProps = omit(TweenGroup.propTypes, childProps);

    const children = React.Children.map(originalChildren, (child, idx) => {
        let originalStyle = child.props.style || {},
            originalRef   = child.ref || identity,
            tweenRef      = comp => {
              this.tweenTargets[idx] = comp
            };

        if (__applyNoTransition) {
          originalStyle = Object.assign(originalStyle, CSS_NO_TRANSITION);
        }

        return React.cloneElement(child, {
          key  : idx,
          style: originalStyle,
          ref  : compose(tweenRef, originalRef)
        });
      }
    );

    return React.cloneElement(component, {
      children,
      ...cleanedProps
    });
  }
}