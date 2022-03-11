import React from 'react';
import '../assets/css/Login.css'
import Logo from '../assets/img/nux.webp'
import axios from 'axios';
//import md5 from 'md5';

class Login extends React.Component{

    constructor(props){super(props);} //Constructor, recibe las propiedades necesarias para construir el componente con ellas.

    state={form:{
            "username":"",
            "password":"",   // State, es un almacenamiento autonomo en REACT. En este caso estamos guardando un array en nuestro estado.
            "port":""
        },

        error:false,
        errorMsg:"",
    }

    submitHandler(event){event.preventDefault();} //En este caso lo que hace la función es simplemente prevenir que el evento ejecute la función predeterminada.

    changehandler = async event=>{ 
        /*La función changeHandler se encargará de que cada vez que ocurra un evento, el cual se le pasa por parametro
          se modificara el estado de este componente, en este caso el atributo form (this.state.form) del el estado (this.state)
          lo que se hara es buscar el match entre el nombre del campo del evento y el nombre del campo en el estado, por ejemplo el campo name que es 
          llenado (evento) hara match con el campo name del estado y se llenara con la data correspondiente*/
        await this.setState({
            form:{
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        })
    }
    
    buttonHandler=()=>{
        /*console.log(this.state.form.password);
        let encodedVal = md5(this.state.form.password);  
        this.setState ({form:{
            password:encodedVal,
        }
        })
        console.log(this.state.form.password);*/


        let url = '/login'; // Declara la varaible url, con el path que nos sugiere la documentación de API's de YEASTAR
        const headers = {'Content-Type': 'application/json'}
        //Inicio de la consulta LOGIN al API LOGIN de YEASTAR
          axios.post(url, this.state.form,{headers: headers}) //Llamada a consulta POST
        .then(response=>{console.log(response.data.status);//.then significa que cuando llegue la respueat se ejecuta lo que esta dentro del then
            if(response.data.status === "Success") //Se evalua si el estatus de respuiesta del API es correcto o erroneo
            {
                localStorage.setItem("token", response.data.token) //guardamos la variable de forma global para todo el servicio web
                this.props.history.push("/callService"); //automaticamente se inicia el componente asociado a /callService
            }else
            {
                this.setState({
                    error: true, 
                    errorMsg: response.data.result.error_msg
                })
            }
        }).catch( error =>{
            console.log(error);
            this.setState({
                error: true,
                errorMsg:"error al conectar con el API"
            })
        })
    }

    //Renderizacion de la pagina, parte visual.
    render(){
        return(
            <React.Fragment>

                <div className="wrapper fadeInDown">

                    <div id="formContent">
                         
                        <div className="fadeIn first">
                            <br /><br />
                            <img src={Logo} width="300px" alt="User Icon" />
                            <br /><br />
                        </div>

                        {/*formulario de inicio de sesión*/}
                            <form onSubmit ={this.submitHandler}>
                                {/*onChange es una propiedad que detecta cuando ocurre un cambio en un campo tipo input y dispar una acción.*/}
                                <input type="text" className="fadeIn second" name="username" placeholder="Usuario" onChange={this.changehandler}/>
                                <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={this.changehandler}/>
                                <input type="text" className="fadeIn third" name="port" placeholder="Puerto" onChange={this.changehandler}/>
                              {/*onClick es una propiedad que detecta cuando un boton es apretado y dispara una acción.*/}
                                <input type="submit" className="fadeIn fourth" value="Iniciar Sesión" onClick={this.buttonHandler}/>
                            </form>

                           {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMSg}
                            </div>

                           }
                            
                    </div>
                </div> 

            </React.Fragment>
        );

    }
}
export default Login;