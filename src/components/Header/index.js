import React from 'react'
import {Grid, Link} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Logo from './../../assets/logo.svg'
import User from './../../assets/user.svg'
import  { INITIAL_PAGE_PATH, HISTORY_PAGE_PATH, LOGOUT_PAGE_PATH } from './../../api_urls'

const useStyles = makeStyles((theme) => ({
  body: {
    height: '15vh',
    wrap: 'no-wrap'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '15vh',
    padding: '0 20rem'
  },
  navigationLinks: {
    fontWeight: theme.typography.regular,
    color: theme.palette.grey.main,
    margin: '0rem 0.5rem',
    "&:hover": {
      fontWeight: theme.typography.bold,
      textDecoration: 'none',
    }
  },
  logo: {
    alignItems: 'center',
    height: '15vh'
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '15vh'
  }
}));

export default function Header() {
  const classes = useStyles()
  return (
    <Grid container className={classes.body}>
      <Grid item sm={3} className={classes.logo}>
        <img src={Logo} height="auto" alt="poketrader logo" />
      </Grid>
      <Grid item sm={6} className={classes.navigation}>
        <Link href={INITIAL_PAGE_PATH} id="home" className={classes.navigationLinks}> Home </Link>
        <Link href={HISTORY_PAGE_PATH} id="history" className={classes.navigationLinks}> History </Link>
        <Link href={INITIAL_PAGE_PATH} id="about" className={classes.navigationLinks}> About </Link>
      </Grid>
      <Grid item sm={3} className={classes.profile}>
        <Grid item xs={6}></Grid>
        <Grid item xs={1}><Link href={LOGOUT_PAGE_PATH} className={classes.navigationLinks}> Logout </Link></Grid>
        <Grid item xs={5}><img src={User} height="50vh" alt="user" /></Grid>
      </Grid>
    </Grid>
  )
}
