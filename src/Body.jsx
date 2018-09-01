import React,{Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './Container';
import UsuarioActivo from './UsuarioActivo';
import Denuncias from './Denuncias';


class Body extends Component{
	constructor(props) {
    super(props);

    this.state = {};
    }

	render() {
		return(
			<div>

					<Switch>
				      <Route exact path='/' component={Container}/>
				      <Route path='/usuario' component={UsuarioActivo}/>
				      <Route path='/denuncias' component={Denuncias}/>
				    </Switch>
			</div>
		)
	}

}

export default Body;