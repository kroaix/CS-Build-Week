import React from 'react';

import Game from './components/Game'
import Rules from './components/Rules'

import 'semantic-ui-css/semantic.min.css'
import {Container, Header, Image} from 'semantic-ui-react'
import './scss/Game.scss'

import logo from '../src/images/Logo.png'


const App = () => {
  return (
    <Container>
      <Header as='h1' className="main-title" dividing>
        <Image className="logo" src={logo} alt="Logo" /><br />
        Conway's Game of Life
      </Header>
      <div className="app">
        <Game />
        <Rules />
      </div>
    </Container>
  );
}

export default App;
