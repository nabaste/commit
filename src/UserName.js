import React from 'react';
import Button from '@material-ui/core/Button';


class UserName extends React.Component {
  constructor(props) {
    super(props);

  this.state = {  };
}

render(){

return(
  <Button
    type="button"
  >
    {this.props.authUser.displayName}
  </Button>
)
}
}

export default UserName;