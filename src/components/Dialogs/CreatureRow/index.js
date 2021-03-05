import React, {useState, useEffect} from 'react'
import {Grid, Button} from '@material-ui/core'
import { POKE_SPRITES_URL, POKE_SPRITES_FORMAT } from './../../../api_urls'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '1rem',
    width: '100%'
  },
  img: {
    maxHeight: '7vh'
  },
  text: {
    textTransform: 'capitalize'
  }
}))

export default function CreatureRow(props) {
  const classes = useStyles()
  const creature = props.creature
  const sprite = POKE_SPRITES_URL + creature.id + POKE_SPRITES_FORMAT
  return (
    <Grid container className={classes.body}>
      <Grid item xs={2}>
        <img src={sprite} className={classes.img} />
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={3} className={classes.text}>
        {creature.name}
      </Grid>
      <Grid item xs={3} className={classes.text}>
        {"exp. " + creature.base_experience}
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={2} className={classes.button}>
        <Button color="secondary" onClick={() => props.pokemonIChooseYou(creature)}> Add </Button>
      </Grid>
    </Grid>
  )
}
