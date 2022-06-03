import React from "react";
import axios from 'axios';
import { Button, Grid, TextField } from '@material-ui/core'
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SmsService from "./SmsService";
function DownloadComponent() {
  const message="Estimado paciente, recordarle que tiene una cita en los la clinica Los Olivos el dia de mañana, si quiere reprogramar su cita por favor comunicarse al numero ..."
  const [beginDate, setBeginDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [array, setArray] = React.useState([]);
  const [uncalled,setUncalled]=React.useState([]);
  const csvFileToArray = string => {
		const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
		const csvRows = string.split("\n");
		const array = csvRows.map(i => {
			const values = i.split(",");
			const obj = csvHeader.reduce((object, header, index) => {
				object[header] = values[index];
				return object;
			}, {});
			return obj;
		});
		setArray(array);
	};
  function uncalledNumbers()
  {
    var uncalledArray = "";
    const ivr = document.getElementById('ivr').value;
    array.forEach( i=> {
        if(i["status"]==="NO ANSWER" &&i["callfrom"]===ivr)
        {
          uncalledArray=uncalledArray.concat((i["callto"]).substring(1),',\n')
        }
    });
     setUncalled(uncalledArray)
     exportCsv([uncalledArray],"noAnswer")

  }
  function exportCsv(data,fileName){
    const urlD = window.URL.createObjectURL(new Blob(data));
    const link = document.createElement('a');
    link.href = urlD;
    link.setAttribute('download', fileName+'.csv');
    document.body.appendChild(link);
    link.click();

  }
  function downloadCsv() {
    const begin = formatDate(beginDate)
    const end = formatDate(endDate)
    const url = "/cdr/get_random?token=" + sessionStorage.getItem("token");
    const cdr = {
      'extid': "all",
      "starttime": begin,
      "endtime": end
    }
    axios.post(url, cdr)
      .then(response => {
        if (response.data.status === "Success") {
          const urlDownload = "/cdr/download?extid=all&starttime=" + begin + "&endtime=" + end + "&token=" + sessionStorage.getItem("token") + "&random=" + response.data.random;
          axios.post(urlDownload, { responseType: 'blob' })
            .then(response => {
              console.log(response)
              if (response.data.status !== "Failed") {
                csvFileToArray(response.data)
                uncalledNumbers()
                exportCsv([response.data],"cdrReport")
              }
              else {
                console.log("falla")
                console.log(response.data)
              }
            })
        } else {
          alert("Hubo un error por favor busque el error " + response.data.errno)
        }
      }).catch(error => {
        alert(error);
      })
  }
  function formatDate(date) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var dateString = (new Date(date - tzoffset)).toISOString().slice(0, -1);
    dateString = dateString.replace('T', ' ');
    dateString = dateString.slice(0, 19);
    return dateString
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={3} md={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label='Inicio'
            value={beginDate}
            ampm={false}
            disableFuture={true}
            onChange={(newValue) => {
              setBeginDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={3} md={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label='final'
            value={endDate}
            ampm={false}
            disableFuture={true}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={3} md={3} ><Button variant="contained"  onClick={downloadCsv} fullWidth>Descargar csv</Button> 
      </Grid>
      <Grid item xs={3} md={3} ><Button  onClick={() => SmsService.sender(message)} color="success" fullWidth variant="contained" >Enviar mensaje</Button></Grid>
    </Grid>
  )
} export default DownloadComponent;