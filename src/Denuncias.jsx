import React, {Component} from 'react';
import CardDenuncia from './CardDenuncia';
import { firebase } from './firebase/index';

class Denuncias extends Component{
	constructor(props){
		super(props);

		this.state = {
			denuncias: [],
			listo: false,
		};
	}

	componentDidMount(){
      const database=firebase.db.ref('denuncias');
      database.once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            this.setState({denuncias: [...this.state.denuncias, childSnapshot.key]})
          })
          }).then(this.setState({listo: true}))    
};


	render(){
		if (!this.state.listo) {
      return <div>Loading...</div>
    };
		
		const denuncias = this.state.denuncias;
		const cards = denuncias.map((denuncia) => (<CardDenuncia id={denuncia.toString()} key={denuncia.toString()} />));

		return (
			<div>
			{cards}
			</div>
			)
		}
	}

export default Denuncias;