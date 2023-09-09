import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Carousel from '../Carousel';

const useStyles = makeStyles(() => ({
  banner: {
    height: '400px',
    backgroundImage: 'url("/banner2.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center", // This will horizontally center the text
    alignItems: "center", // This will horizontally center the child divs
}}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
       <div className={classes.tagline}>
          <Typography 
          variant="h2"
          align="center" // Center-align the text inside Typography
          style={{
            fontWeight: "bold",
            marginBottom: 15,
            fontFamily: "Montserrat",
          }}
          >
            Crypto Mine
          </Typography>
          <Typography
          variant="subtitle2"
          align="center" // Center-align the text inside Typography
          style={{
            color: "darkgrey",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
          }}
          >
          Unlock insights into your preferred digital currency
          </Typography>
       </div>
          <Carousel/>
      </Container>
    </div>
  )
}

export default Banner;