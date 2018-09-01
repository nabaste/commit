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
import { auth } from './firebase/index';

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

class SignIn extends React.Component {

  constructor(props) {
    super(props);

  this.state = {
    open: false,
    mail: '',
    password: '',
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
     });
  };

  handleSubmit = (event) => {

    auth.doSignInWithEmailAndPassword(this.state.mail, this.state.password)
      .then(authUser => {
        this.setState({open: false,
    mail: '',
    password: '',});
        alert('login succesfuk')
      })
      .catch(error => {
        this.setState({warning:error});
        alert(error);
      });
  }

  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;

    const isInvalid =
      this.state.password === '' ||
      this.state.mail === '';


    return (
      <div>
        <Button onClick={this.handleClickOpen}>Sign In</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Sign In"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ingresá tu mail y contraseña
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
      </form>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} disabled={isInvalid} color="primary" autoFocus>
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SignIn.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withMobileDialog())(SignIn);