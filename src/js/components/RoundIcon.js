import React from 'react';
import {css} from 'emotion';
import {theme} from '../theme/Theme';

const Size = 70;

export const RoundIcon = ({children, color, className=null, ...rest}) => {

  const style = css`
    position: relative;
    width: ${Size}px;
    height: ${Size}px;
    line-height: ${Size}px;
    border-radius: 100%;
    overflow: hidden;
    color: #fff;
    text-shadow: none;
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
    background: ${theme.gradients[color]};
  `;

  let cls = [style, className];

  return <div className={cls.join(' ')} {...rest}>{children}</div>;
};