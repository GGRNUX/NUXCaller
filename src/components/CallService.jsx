import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import '../assets/css/Login.css'
import csv from "csv";
import axios from 'axios';
import Footer from '../components/layouts/Footer'
import Header from "./layouts/Header";
import theme from "../theme"
import { ThemeProvider } from '@material-ui/core/styles'
import { useMediaQuery, Container, Button, Grid, List, ListItemText, Typography } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid';


var callers
var callersLength
var stop
function DragArea() {
  const initialList = []
  const [data, setData] = React.useState([]); //estado de react, forma de almacenamiento autonomo.
  const [list, setList] = React.useState(initialList);
  const onDrop = useCallback(acceptedFiles => {

    const reader = new FileReader(); //Se declara una constante de tipo lector de archivos
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading failed");
    reader.onload = () => {
      // Parse CSV file
      csv.parse(reader.result, (err, data) => {
        sessionStorage.setItem("nums", data) //Se guarda en la sesion el archivo cargado.
        console.log("Parsed CSV data: ", data.length); //Imprime en consola el tamaño del array de numeros parseados
        callers = data; //La variable callers es declarada e inicializada con el valor de data, es decir la data cargada 
        setData(callers);//Actualizamos el estado data del componente con el valor de callers
        callersLength = callers.length - 1; //Se da el tamaño del array de numeros cargados a la variable callersLenght (cuenta desde el 0)


      });
    };


    // lectura del contenido del archivo cargado
    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  function makeCall() {
    var token = sessionStorage.getItem(token); //Se crea la variable token en el componente y se recupera su valor desde el almacenamiento local.
    let url = "/ivr/dial_outbound?token=" + sessionStorage.getItem("token"); //Se crea la variable local url y se le añade el token de acceso
    const headers = { 'Content-Type': 'application/json' }
    //Declaración del arreglo de llamada, con la estructura adecuada para enviarse como body de la consulta al API.
    const call = {
      "ivrid": "6502",
      "outto": "8" + callers[callersLength].toString(),
      "fromext": "1001"
    }

    console.log(call);

    //Consulta POST al API, se le envia el url al cual mandar la consulta y el body de la consulta.
    axios.post(url, call, {
      headers: headers
    })
      //Se recibe la respuesta de la consulta API y se imprime success en consola en caso de ser concretada de forma correcta.
      .then(response => {
        if (response.data.status === "Success") {
          setList(prevArray => [...prevArray, { called: callers[callersLength + 1], id: uuidv4() }])
          console.log("success")
        } else {
        }
      }).catch(error => {
        console.log(error);
        this.setState({
          error: true,
          errorMsg: "error al conectar con el API"
        })
      })
    /*Al haber completado la llamada para el ultimo numero del arreglo se resta el tamaño en uno
     de esta manera el mismo no volvera a ser tomado en cuenta*/
    callersLength = callersLength - 1;

  }
  function callLoop() {
    //setTimeout llama a una función despues de el tiempo desigando en milisegundos, en este caso 60 000
    makeCall(); //llamada a la función makeCall 
    setTimeout(function () {
      if (callersLength !== -1 && stop !== true) { //si el array de numeros es distinto de -1 ingresa al if caso contrario termina el programa
        callLoop(); //la función se llama de forma recursiva, esto significa que de nuevo iniciara su ejecución       
      }
    }, 40000)

  }
  function llamar() {
    stop = false
    callersLength = callers.length - 1
    callLoop()
  }
  function cancelar() {
    stop = true
    callersLength = callers.length - 1
  }
  function pausar() {
    stop = true
  }
  function continuar() {
    stop = false
    callLoop()
  }
  //Parte visual del componente 
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    
    <ThemeProvider theme={theme}>
     
      <Header></Header>
      <Container>
        <div className="fileDrop" {...getRootProps()}>
          <input {...getInputProps()} /> {/*Campo para recibir el archivo csv.*/}
          <>Arrastra el archivo CSV o hacer click para subirlo</>
        </div>

        <br />
        <br />
        <div>
          <Container >
            <Grid container spacing={2} >
              <Grid item xs={3} md={3} ><Button variant="contained" color="success" onClick={llamar} fullWidth>Llamar</Button> </Grid>
              <Grid item xs={3} md={3}><Button variant="contained" style={{background:'#B85252'}}  onClick={cancelar} fullWidth>Cancelar</Button> </Grid>
              <Grid item xs={3} md={3}><Button variant="contained" style={{background:'#EADEDE', color:'black'}} onClick={pausar} fullWidth>Pausar</Button> </Grid>
              <Grid item xs={3} md={3}><Button variant="contained" style={{background:'#10316B'}} onClick={continuar} fullWidth>Continuar</Button> </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop:'30px'}}>
              <Grid item xs={6} md={6}>
                <p>Numeros cargados:</p>
                <List class="list-group" style={{ maxHeight: '350px', overflow: 'auto' }}>
                  {data.map((number, index) => ( //utiliza el array de datos e imprime el unico campo existente para cada elemento del array, lo hace n forma de lista 
                    <ListItemText class="list-group-item" key={index}>
                      <Typography>{number}</Typography>
                    </ListItemText>))}
                </List>
              </Grid>
              <Grid item xs={6} md={6}>
                <p>Numeros cargados:</p>
                <List class="list-group" style={{ maxHeight: '350px', overflow: 'auto' }}>
                  <ul class="list-group">
                    {list.map((item) => (
                      <li class="list-group-item" key={item.id}>{item.called}</li>))}
                  </ul>
                </List>
              </Grid>
            </Grid>


          </Container>

        </div>


      </Container>

      <Footer />
      
    </ThemeProvider>
    
  );

}
export default DragArea;