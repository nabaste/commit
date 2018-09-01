import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { auth,db } from './firebase/index';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    open: false,
    mail: '',
    password: '',
    confirmPassword: '',
    warning: null,
  };
}

    handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCancel = () => {
    this.setState({ 
      open: false,
    mail: '',
    password: '',
    confirmPassword: '',
     });
  };

  handleSubmit = (event) => {

    const {
      mail,
      password,
    } = this.state;

    auth.doCreateUserWithEmailAndPassword(this.state.mail, this.state.password)
      .then(authUser => {
        db.doCreateUser(authUser.user.uid, mail, password)
      .catch(error => {
        this.setState({warning:error});
        alert(error);
      })
  })
  };

  handleGoogleSignIn = () => {
  auth.doSignInWithPopup(auth.googleProvider)
          .then(function(result) {
    const user = result.user;
    db.doCreateUser(user.uid, user.email, user.displayName)
  }).catch(error => {
        this.setState({warning:error});
        alert(error);
      })
  };

    handleFacebookSignIn = () => {
    auth.doSignInWithPopup(auth.facebookProvider)
          .then(function(result) {
    const user = result.user;
    db.doCreateUser(user.uid, user.email, user.displayName)
  }).catch(error => {
        this.setState({warning:error});
        alert(error);
      })
  };

  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;

    const isInvalid =
      this.state.password !== this.state.confirmPassword ||
      this.state.password === '' ||
      this.state.mail === '';


    return (
      <div>
        <Button onClick={this.handleClickOpen}>Sign Up</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Sign Up"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ingresá tu mail y una contraseña o utiliza tu cuenta de otra red social
            </DialogContentText>
          </DialogContent>
          <form  className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="mail"
          label="Mail"
          className={classes.textField}
          defaultValue=""
          margin="normal"
          onChange={this.handleChange('mail')}
        />
                <TextField
          required
          id="password"
          label="Password"
          className={classes.textField}
          defaultValue=""
          margin="normal"
          onChange={this.handleChange('password')}
        />
                <TextField
          required
          id="confirmPassword"
          label="Confirm Password"
          className={classes.textField}
          defaultValue=""
          margin="normal"
          onChange={this.handleChange('confirmPassword')}
        />

      </form>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} disabled={isInvalid} color="primary" autoFocus>
              Submit
            </Button>
            <Button onClick={this.handleGoogleSignIn} color="primary">
              Sign In with Google
            </Button>
            <Button onClick={this.handleFacebookSignIn} color="primary">
              Sign In with Facebook
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SignUp.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withMobileDialog())(SignUp);