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

export const Desk = ({children, ...rest}) => <Shape {...rest}><img src={DeskImg} alt='A modern desk and chair' /></Shape>;