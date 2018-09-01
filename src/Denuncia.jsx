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
import {firebase} from './firebase/index';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
    alignItems: 'flex-end',
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

class Denuncia extends React.Component {

  constructor(props) {
    super(props);

  this.state = {
    open: false,
    descripcion: '',
  };
}


    onFloatingButtonClick = () => 
    this.setState({
      open: true,
    });

    handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };



  handleCancel = () => {
    this.setState({ 
    open: false,
     });
  };

  handleSubmit = () => {
    const postData = {
      "name": this.state.descripcion,
      "lat": this.props.latLng.lat,
      "lng": this.props.latLng.lng,
      "user": this.props.authUser.uid,
    };
    const newPostKey = firebase.db.ref().child('denuncias').push().key;
    let updates = {};
    updates['/denuncias/' + newPostKey] = postData;
    updates['/users/' + this.props.authUser.uid + '/' + newPostKey] = postData;
    firebase.db.ref().update(updates);
    this.setState({
      open: false,
    })
};

  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;

    const isInvalid =
      this.props.authUser === null ||
      this.state.descripcion === '';


    return (
      <div>
          <Button onClick={this.onFloatingButtonClick} variant="contained"  aria-label="Add" className={classes.button}>
            Denunciar
          </Button> 
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Denuncia"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ingresá una breve descripcion y una foto si te copa
            </DialogContentText>
          </DialogContent>
          <form  className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="descripcion"
          label="descripcion"
          className={classes.textField}
          defaultValue=""
          margin="normal"
          onChange={this.handleChange('descripcion')}
        />
      </form>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} disabled={isInvalid} color="primary" autoFocus>
              Denunciar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Denuncia.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withMobileDialog())(Denuncia);