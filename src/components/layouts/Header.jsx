import { Grid, Typography, Button, Box } from "@material-ui/core";
import logo from "../../assets/img/NUXWAY-WF.png"
const Header = () => {
    return (
        <Box  sx={{
              backgroundColor: '#F79F3B',
              height:'105px',
              mb:8}
            }>
          <Grid container spacing={2} >
                  <Grid item xs={3} md={3} > 
                    <Button variant="text" onClick={() => { window.location.assign('/') }}>
                      <img src={logo} alt="logo"  style={{marginTop:'7px', width: '43%', height: '43%' }} />
                    </Button> 
                  </Grid>
                  <Grid  item xs={6} md={6}><Typography style={{marginTop:'25px'}} variant="h1"  align="center">NUX CALLER</Typography></Grid>
          </Grid>
        </Box>
    );
  };
  
  export default Header;