import '~/config/ReactotronConfig';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '~/plugin/contCharacter';
import '~/plugin/fm';
import '~/plugin/background';

ReactDOM.render(<App />, document.getElementById('root'));
