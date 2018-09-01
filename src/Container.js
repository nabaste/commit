import React, { Component } from 'react';
import { GoogleApiWrapper,InfoWindow,Marker,Map } from 'google-maps-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { firebase } from './firebase/index';
import {GoogleApiKey} from './ApiKeys';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});


class Container extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      click: {},
      viewClick: false,
      denuncia: false,
    };
  }
 
componentDidMount(){
      const database=firebase.db.ref('denuncias');
      database.once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            this.setState({locations: [...this.state.locations, childSnapshot.val()]})
          })
          });    
};

onMarkerClicked = (props, marker) => {
    this.state.showingInfoWindow 
    ? this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    : this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    })
};

  onMapClicked = (props,center,e) => {
    this.state.showingInfoWindow 
    ? this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    : this.setState({
        click: { 
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
        viewClick: true,
      }); 
    };

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
      click: {},
      viewClick: false,
    });


  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    };
        
    //const { classes } = this.props;

    const posClick = {lat: this.state.click.lat,lng: this.state.click.lng};
    const denuncias = this.state.locations;
    const marcadores = denuncias.map((denuncia) => 
      <Marker position={{lat: denuncia.lat,lng: denuncia.lng}} key={denuncia.name} onClick={this.onMarkerClicked} name={denuncia.name} />
      )


    return (
      <div>
        <Map 
          google={this.props.google} 
          onClick={this.onMapClicked}
          style={{ height: '90vh',  width: '86vw', position: 'absolute' }}
          zoom= {13}
          initialCenter= {{
            lat: -34.59072,
            lng: -58.4318976
          }}
          centerAroundCurrentLocation= {true}>

          {marcadores}
        

          <Marker visible={this.state.viewClick} position={posClick} onClick={this.onMarkerClicked} name='Denunciar' />

          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}>
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
            </div>
          </InfoWindow>


        </Map>
      </div>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  GoogleApiWrapper({ apiKey: GoogleApiKey}),
  withStyles(styles))(Container);