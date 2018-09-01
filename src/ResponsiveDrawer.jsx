import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import AuthUserContext from './AuthUserContext';
import {Link} from 'react-router-dom';
import Body from './Body';
import NestedList from './NestedList';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import UserName from './UserName';
import Denuncia from './Denuncia';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    //height: 440,
    zIndex: 1,
    //overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    //padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
    constructor(props) {
    super(props);
    
    this.state = {
    mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
<AuthUserContext.Consumer>
          {authUser => authUser
            ? (<div>
              <Link to='/usuario'>
              <Avatar alt={authUser.displayName} src={authUser.photoURL} className={classes.avatar} />
              <UserName authUser={authUser} /> </Link>
              <SignOut />
              </div>
          )  : ( 
              <div>         
              <SignIn /> {/* deberia hacer un componente con el contenido de estos dos divs?*/}
              <SignUp />
              </div>
              )}
        </AuthUserContext.Consumer>
          <Divider />
          <NestedList />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Commit
            </Typography>
                      <AuthUserContext.Consumer>
           {authUser =>  <Denuncia  authUser={authUser} latLng={this.state.click} />}
          </AuthUserContext.Consumer>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main >
          <div className={classes.toolbar} />
          <Body />
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
