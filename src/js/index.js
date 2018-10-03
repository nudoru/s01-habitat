import React from 'react';
import ReactDOM from 'react-dom';
import Global from './theme/Global'; // For global CSS reset + a few styles for html and body
import * as Lorem from './utils/Lorem';

import Art from './components/Art';
import Gallery from './components/Gallery';
import Desk from "./components/Desk";
import Details from "./components/Details";

const CardArt = require('../img/cropped-01.png');
const BackgroundArt = require('../img/full-01.png');

const TestArt = (props) => (<Art {...props}>
  <Art.ACard><img src={CardArt}/><h1>{Lorem.title(3,5)}</h1><p>{Lorem.title(10,15)}</p></Art.ACard>
  <Art.ABackground><img src={BackgroundArt}/></Art.ABackground>
</Art>);

const App = () => {
  return <React.Fragment>
    <Gallery>
      <TestArt/>
      <TestArt/>
      <TestArt/>
      <TestArt/>
    </Gallery>
    <Desk/>
    <Details>
      <h1>Sketch 1</h1>
      <p>By <a href='https://twitter.com/nudoru'>Matt Perkins</a></p>
      <p>Inspired by <a href='https://dribbble.com/shots/4934380-Habitat'>Cosmin Capitanu</a></p>
      <p><a href='https://github.com/nudoru/s01-habitat'>Source code</a></p>
    </Details>
  </React.Fragment>;

};

ReactDOM.render(<App/>, document.querySelector('#js-application'));