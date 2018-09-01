import React, {Component} from 'react';

class Usuario extends Component{
	constructor(props){
		super(props);

		this.state={};
	}

	componentDidMount(){
		console.log(this.props);
	}

	render(){

	const {id} = this.props

		return(

					<h1>hola {id.displayName} !</h1>
			
			
		);
	}
}

export default Usuario;