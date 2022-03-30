import { Grid, Typography, Button, Box } from "@material-ui/core";
import logo from "../../assets/img/NUXWAY-WF.png"
const Header = () => {
    return (
        <Box  sx={{
            backgroundColor: 'orange',
            mb:2}
          }>
        <Grid container spacing={2} >
              <Grid item xs={3} md={3} > <Button variant="text" onClick={() => { window.location.assign('/') }}>
        <img src={logo} alt="logo"  style={{ width: '40%', height: '40%' }} />
        </Button> </Grid>
              <Grid item xs={6} md={6}><Typography variant="h1"  align="center">NUX Caller</Typography></Grid>
            </Grid>
        </Box>
    );
  };
  
  export default Header;