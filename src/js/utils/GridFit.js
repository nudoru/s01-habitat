import React from 'react';
import { css } from 'emotion';

const autofitgrid = props => css`
  display: grid;
  grid-gap: ${props.gap};
  grid-template-columns: repeat( auto-fit, minmax(${props.min}, ${props.max}) );
`;

export const GridFit = ({className = '', children, ...rest}) =>
  <div className={autofitgrid({...rest})}>{children}</div>;