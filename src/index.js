const fs = require('fs');
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Body from './components/body/body.jsx';

const markup = renderToStaticMarkup(<Body/>);

fs.outputFileSync('./dist/index.html', markup);