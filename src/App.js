import React from 'react';
import './App.css';
import ResponsiveDrawer from './ResponsiveDrawer'
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import withAutentication from './withAutentication';

function App() {
  return (
    <React.Fragment>
    <CssBaseline />

    	<div className="App">
			<ResponsiveDrawer />
    	</div>
    </React.Fragment>
  );
}

export default withAutentication(App);