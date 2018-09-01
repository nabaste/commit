import React from 'react';
import Button from '@material-ui/core/Button';
import { auth } from './firebase/index';


class SignOut extends React.Component {
  constructor(props) {
    super(props);

  this.state = {  };
}

handleSignOut = () => {
auth.doSignOut()
}

render(){

return(
  <Button
    type="button"
    onClick={this.handleSignOut}
  >
    Sign Out
  </Button>
)
}
}

export default SignOut;