import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import firebase from './firebase';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class UserList extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: 'Login',
    }
}

componentDidMount(){ 
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const token = result.credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  console.log('login con exito! ' + user.displayName);
}).catch(function(error) {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  const credential = error.credential;
  console.log('error en el login!' + errorMessage + errorCode + email + credential);
});
}

componentDidUpdate(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    let displayName = user.displayName;
console.log('nuevo usuario! bienvenido' + displayName);
  } else {
    console.log ('sigoutea3');
  }
});
}


render(){
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText primary={this.state.user} secondary="Jan 9, 2014" />
        </ListItem>
      </List>
    </div>
  );
}
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
