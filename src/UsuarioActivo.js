import React from 'react';
import Usuario from './Usuario';
import AuthUserContext from './AuthUserContext';


const UsuarioActivo = (props) => {
	return(
	<AuthUserContext.Consumer>
		{authUser =>
			<Usuario id={authUser}/>
	  	}
	</AuthUserContext.Consumer>

	);
}

export default UsuarioActivo;