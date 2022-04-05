import { Grid, Typography, Button, Box } from "@material-ui/core";
import logo from "../../assets/img/NUXWAY-WF.png"
import EqualizerIcon from '@mui/icons-material/Equalizer'
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  snsIcon: {
    color: "#FFFFFF",


    "&:hover": {
      color: "#0079C1",
    },
  },
}));
function goToDashboard(){
  
}
const Header = () => {
  const classes = useStyles();
  return (
    <Box sx={{
      backgroundColor: 'orange',
      mb: 2
    }}>
      <Grid container spacing={2} >
        <Grid item xs={3} md={3} >
          <Button variant="text" onClick={() => { window.location.assign('/') }}>
            <img src={logo} alt="logo" style={{ width: '40%', height: '40%' }} />
          </Button>
        </Grid>
        <Grid item xs={6} md={6}><Typography variant="h1" align="center">NUX Caller</Typography></Grid>
        <Grid item xs={3} md={3}
          target="_blank"
          rel="noreferrer noopener"
          href='/dashboard'>
          <EqualizerIcon
            onClick={goToDashboard()}
            fontSize="large"
            className={classes.snsIcon}
            href='/dashboard'
          />
        </Grid>
      </Grid>

    </Box>
  );
};

export default Header;