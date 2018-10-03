import React from 'react';
import ReactDOM from 'react-dom';
import Global from './theme/Global'; // For global CSS reset + a few styles for html and body
import * as Lorem from './utils/Lorem';

import Art from './components/Art';
import Gallery from './components/Gallery';
import Desk from "./components/Desk";

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
  </React.Fragment>;

};

ReactDOM.render(<App/>, document.querySelector('#js-application'));