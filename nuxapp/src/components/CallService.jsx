import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import '../assets/css/Login.css'
import csv from "csv";
import axios from 'axios';
import Footer from '../components/layouts/Footer'
import theme from "../theme"
import {ThemeProvider} from '@material-ui/core/styles'
import {useMediaQuery, Container, Button, Grid} from '@material-ui/core'

var callers
var callersLength  
function DragArea() {
  const [data, setData] = React.useState([ ]); //estado de react, forma de almacenamiento autonomo.
  const onDrop = useCallback(acceptedFiles => 
      {
        const reader = new FileReader(); //Se declara una constante de tipo lector de archivos
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading failed");
        reader.onload = () => {
          // Parse CSV file
          csv.parse(reader.result, (err, data) => {
            localStorage.setItem("nums", data) //Se guarda de forma local el archivo cargado.

            console.log("Parsed CSV data: ", data.length); //Imprime en consola el tamaño del array de numeros parseados
            callers = data; //La variable callers es declarada e inicializada con el valor de data, es decir la data cargada 
            setData(callers);//Actualizamos el estado data del componente con el valor de callers
            console.log("Data en estado:", data)
            callersLength = callers.length-1; //Se da el tamaño del array de numeros cargados a la variable callersLenght (cuenta desde el 0)
                       
              const completed = "Se han completado todas las llamadas"
              localStorage.setItem("completed", completed)
             
          });
        };
        
    
        // lectura del contenido del archivo cargado
        acceptedFiles.forEach(file => reader.readAsBinaryString(file));
      }, []);
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
      function makeCall(){
        var token =  localStorage.getItem(token); //Se crea la variable token en el componente y se recupera su valor desde el almacenamiento local.
        let url = "/ivr/dial_outbound?token=" + localStorage.getItem("token"); //Se crea la variable local url y se le añade el token de acceso
        const headers = {'Content-Type': 'application/json'}
        //Declaración del arreglo de llamada, con la estructura adecuada para enviarse como body de la consulta al API.
        const call = {
            "ivrid": "6502",
            "outto": "8"+ callers[callersLength].toString(),
            "fromext": "1001"
            }

            console.log(call);

            //Consulta POST al API, se le envia el url al cual mandar la consulta y el body de la consulta.
            axios.post(url, call,{
            headers: headers
        })
        //Se recibe la respuesta de la consulta API y se imprime success en consola en caso de ser concretada de forma correcta.
        .then( response=>{
            if(response.data.status === "Success"){
                console.log("success")
            }else{
            }
        }).catch( error =>{
            console.log(error);
            this.setState({
                error: true,
                errorMsg:"error al conectar con el API"
            })
        }) 
        console.log(callersLength);
        /*Al haber completado la llamada para el ultimo numero del arreglo se resta el tamaño en uno
         de esta manera el mismo no volvera a ser tomado en cuenta*/
        callersLength = callersLength - 1; 

      }
      function callLoop() { 
        //setTimeout llama a una función despues de el tiempo desigando en milisegundos, en este caso 60 000
         setTimeout(function() { 
             makeCall(); //llamada a la función makeCall
           if (callersLength !== -1) { //si el array de numeros es distinto de -1 ingresa al if caso contrario termina el programa
               console.log("inLoop");
               callLoop(); //la función se llama de forma recursiva, esto significa que de nuevo iniciara su ejecución       
           }                 
         }, 60000)
       }
      function prueba2()
      {
        console.log(callersLength)
      }
      function prueba()
      {
        console.log(callers)
        makeCall()
      }

    
      //Parte visual del componente 
      const isMatch=useMediaQuery(theme.breakpoints.down('lg'));
      return (
        <ThemeProvider theme={theme}>

        <Container maxWidth="lg">            
          <div className="fileDrop" {...getRootProps()}>
          <input {...getInputProps()} /> {/*Campo para recibir el archivo csv.*/}
          <p>Arrastra aqui el archivo que deseas cargar</p>
        </div>

          <br />
          <br />
       <div>
        <Container maxWidth="lg" > 
        <Grid container spacing = {2}>
         <Grid item xs={6} md={6}><Button onClick={prueba}>Llamar</Button> </Grid>
          <Grid item xs={6} md={6}><Button>Cancelar</Button> </Grid>
        </Grid>

          <p>Numeros cargados:</p>
          <ul class="list-group">
            {data.map((number) => ( //utiliza el array de datos e imprime el unico campo existente para cada elemento del array, lo hace n forma de lista 
              <li class="list-group-item" key={number}>
                {number}
               </li> ))}
              </ul>
        </Container>
        </div>

        </Container>
        <Footer/>
      </ThemeProvider>
        );

      }
export default DragArea;
