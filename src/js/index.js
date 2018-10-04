import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {css} from 'emotion';
import Global from './theme/Global'; // For global CSS reset + a few styles for html and body
import * as Lorem from './utils/Lorem';

import Art from './components/Art';
import Gallery from './components/Gallery';
import {Desk} from "./components/Desk";
import {Details} from "./components/Details";
import {RoundIcon} from "./components/RoundIcon";
import {SVGIcon} from "./components/SVGIcon";
import {theme} from "./theme/Theme";

const CardArt = require('../img/cropped-01.png');
const BackgroundArt = require('../img/full-01.png');

// Otherwise new lorem is generated on each rerender
const titles = _.range(7).map(e => Lorem.title(3,5));
const content = _.range(7).map(e => Lorem.title(10,15));
const iconColors = ['warm-flame','sunny-morning','dusty-grass','tempting-azue','ripe-malinka','malibu-beach','strong-bliss'];
const colors = _.range(7).map(e => Lorem.oneOf(iconColors));
const RoundIconArt = css`
  margin: 0 auto;
  margin-top: 5rem;
  box-shadow: ${theme.shadows.dropShadow.lg};
`;

const SVGIconAdjust = css`
  top: 5px;
`;

const TestArt = ({idx=0, ...rest}) => (<Art {...rest}>
  <Art.ACard><img src={CardArt}/><h1>{titles[idx]}</h1><p>{content[idx]}</p></Art.ACard>
  <Art.ABackground><img src={BackgroundArt}/><h1>{titles[idx]}</h1><RoundIcon className={RoundIconArt} color={colors[idx]}><SVGIcon className={SVGIconAdjust} name='package'></SVGIcon></RoundIcon></Art.ABackground>
</Art>);

const App = () => {
  return <React.Fragment>
    <Gallery>
      <TestArt idx={0}/>
      <TestArt idx={1}/>
      <TestArt idx={2}/>
      <TestArt idx={3}/>
      <TestArt idx={4}/>
      <TestArt idx={5}/>
      <TestArt idx={6}/>
    </Gallery>
    <Desk/>
    <Details>
      <h1>Sketch 1</h1>
      <p>Navigate with the arrow keys, click to expand.</p>
      <p>By <a href='https://twitter.com/nudoru'>Matt Perkins</a></p>
      <p>Inspired by <a href='https://dribbble.com/shots/4934380-Habitat'>Cosmin Capitanu</a></p>
      <p><a href='https://github.com/nudoru/s01-habitat'>Source code</a></p>
    </Details>
  </React.Fragment>;

};

ReactDOM.render(<App/>, document.querySelector('#js-application'));