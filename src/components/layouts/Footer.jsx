import { makeStyles } from "@material-ui/styles";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { routes } from "../../data/routes";
import Social from "../Social";
import logo from "../../assets/img/NUXWAY.png"
const black = "#000000";

const useStyles = makeStyles((theme) => ({
  footer: {
    fontFamily: "Roboto",
    backgroundColor: black,
    width: `100%`,
    bottom: "0",
    padding: "2em",
    alignSelf: 'flex-end'

  },
  link: {
    fontFamily: "Roboto",
    fontSize: "1.25em",
    color: "#fff",
    "&:hover": {
      color: "#F79F3B",
    },
  },
  text: {
    fontFamily: "Roboto",
    color: 'black',
    margin: 20,
  },
  copylight: {
    color: "#fff",
    fontSize: "1em",
    "&:hover": {
      color: "#F79F3B",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const path = routes;
  return (
    <div className={classes.footer}>
      <div>
        <Container>
          <Grid container spacing={4} direction="row" justify="space-between" alignItems="flex-start">
              <Grid item direction="column" justify="flex-start" alignItems="flex-start" xs={12} sm={4}>
                    <Grid container spacing={3} justify="center">
                    {path.map(({ name, link }) => (
                      <Grid item key={link} />))
                    }
                    </Grid>
                  
                  <Grid container direction="column" style={{ margin: "1.2em 0" }}>
                    <Social />
                  </Grid>
                  
                  <Grid
                      item
                      container
                      component={"a"}
                      target="_blank"
                      rel="noreferrer noopener"
                      href="https://www.nuxway.net/"
                      justify="center"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Typography variant='caption' className={classes.copylight}>
                        &copy;Nuxway Technology
                      </Typography>
                  </Grid>   
              </Grid>

              <Grid item direction="column" justify="flex-start" alignItems="flex-end" xs={12} sm={4}>
                <Container justify="flex-start">
                  <Typography variant='h3' style={{ display: 'inline-block', color: 'white' }}>LIDER EN </Typography>
                  <Typography variant='h3' style={{ display: 'inline-block', color: 'orange' }}>&nbsp;TELECOMUNICACIONES</Typography>
                  <Button variant="text" onClick={() => { window.location.assign('/') }}>
                  <img src={logo} alt="logo" className={classes.logo} style={{ width: '70%', height: '70%' }} />
                  </Button>
                </Container>
              </Grid>

              <Grid item direction="column" justify="flex-start" alignItems="flex-end" xs={12} sm={4}>
                <Container maxWidth='lg'>
                  <Typography variant='h4' style={{ margin: 'auto', color: 'white' }} align="right" >Dirección:</Typography>
                  <Typography variant='body2' style={{ marginBottom: '20px', color: 'white' }} align="right">Calle Las Jarkas #204</Typography>
                </Container>
                <Container maxWidth='lg'>
                  <Typography variant='h4' style={{ margin: 'auto', color: 'white' }} align="right" >Telefonos:</Typography>
                  <Typography variant='body2' style={{ margin: 'auto', color: 'white' }} align="right">4483862 - 4225892 - 70770144</Typography>
                </Container>
              </Grid>

          </Grid>
        </Container>

        
      </div>
    </div>
  );
};

export default Footer;