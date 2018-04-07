import React from 'react'
import { render } from 'react-dom'
import App from './components/App/'
const root = document.createElement('div');
document.getElementsByTagName('body')[0].appendChild(root);

render(<App />, root)