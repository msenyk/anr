import React from 'react'
import { render } from 'react-dom'
import Home from './views/Home.jsx'
import { getURLParameterByName } from './utils/common.jsx'

const clientKey = getURLParameterByName('clientKey');

render((
	<Home clientId={clientKey}/>
), document.getElementById('app'))
