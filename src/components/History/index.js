import React, {useState, useEffect} from 'react'
import {Grid, Typography, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fetchUserEntries } from './fetchUserEntries'

const useStyles = makeStyles((theme) => ({
  body: {
    margin: 'auto',
    height: '70vh',
  },
}));

const useStylesEntryRow = makeStyles((theme) => ({
  body: {
    display: 'flex',
    border: '1px #666',
    borderRadius: '6px',
    Width: '100%'
  }
}))

const EntryRow = (props) => {
  const classes = useStylesEntryRow()
  const entry = props.entry
  console.log("chega aqui")

  return (
      <Grid container className={classes.body}>
      <Paper elevation={4} >

        <Grid item sm={5}>
          {entry.host}
        </Grid>
        <Grid item sm={5}>
          {entry.opponent}
        </Grid>
        <Grid item sm={2}>
          {entry.isTradeFair}
        </Grid>
        </Paper>

      </Grid>
  )
}
export default function History() {
  const classes = useStyles()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      const data = await fetchUserEntries()
      if (data.status === 200) {
        setEntries(data.data)
      }
      else {
        setEntries("You haven't created any simulations in your history so far.")
      }
    }
    fetchData()
  }, [])

  return (
    <Grid container>
    { entries ? entries.map(function(entry) {
        return <Grid item xs={12}><EntryRow entry={entry} /></Grid>
      }) : console.log("diacho")}
    </Grid>
  )
}

// {entries ? entries.forEach(entry => console.log(entry)) : ''}
