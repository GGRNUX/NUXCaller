import React from "react";
import axios from 'axios';
import { Button, Grid, TextField } from '@material-ui/core'
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
function DownloadComponent() {
  const [beginDate, setBeginDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
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
                const urlD = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = urlD;
                link.setAttribute('download', 'cdr.csv');
                document.body.appendChild(link);
                link.click();
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
      <Grid item xs={4.5} md={4.5}>
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
      <Grid item xs={4.5} md={4.5}>
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
      <Grid item xs={3} md={3} ><Button variant="contained" color="success" onClick={downloadCsv} fullWidth>Descargar csv</Button> </Grid>
    </Grid>
  )
} export default DownloadComponent;