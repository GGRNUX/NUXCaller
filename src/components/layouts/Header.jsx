import { Container, Grid, Typography, Button, Box } from "@material-ui/core";
import logo from "../../assets/img/nux.webp"
const Header = () => {
    return (
        <Box  sx={{
            backgroundColor: 'orange',
            mb:2}
          }>
        <Grid container spacing={2} >
              <Grid item xs={3} md={3} > <Button variant="text" onClick={() => { window.location.assign('/') }}>
        <img src={logo} alt="logo"  style={{ width: '70%', height: '70%' }} />
        </Button> </Grid>
              <Grid item xs={6} md={6}><Typography variant="h1"  align="center">Caller</Typography></Grid>
            </Grid>
        </Box>
    );
  };
  
  export default Header;