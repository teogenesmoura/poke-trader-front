import React, {useState, useEffect} from 'react'
import {Grid, Typography,Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fetchUserEntries } from './fetchUserEntries'
import { POKE_SPRITES_URL, POKE_SPRITES_FORMAT } from './../../api_urls'

const useStyles = makeStyles((theme) => ({
  body: {
    margin: 'auto',
    height: '70vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  noEntries: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.hairline
  }
}));

const useStylesEntryRow = makeStyles((theme) => ({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px #666',
    borderRadius: '6px',
    margin: '2rem 0 0 0',
    width: '100%',
  },
  name: {
    fontWeight: theme.typography.bold
  },
  tradeFair: {
    fontWeight: theme.typography.medium,
    color: theme.palette.green.main
  },
  tradeNotFair: {
    fontWeight: theme.typography.medium,
    color: theme.palette.red.main
  }
}))


const EntryRow = (props) => {
  const classes = useStylesEntryRow()
  const entry = props.entry
  const host = JSON.parse(entry.host)
  const opponent = JSON.parse(entry.opponent)

  const row = (creature) => {
    return <Grid item xs={3}>
              <img src={POKE_SPRITES_URL + creature.id + POKE_SPRITES_FORMAT} />
              <Typography className={classes.name}>{creature.name}</Typography>
              <Typography>"Exp. " + {creature.base_experience}</Typography>
            </Grid>
  }

  return (
      <Grid container className={classes.body}>
        {host.map(creature => {
          return row(creature)
        })}
        {entry.isTradeFair ?
          <Typography className={classes.tradeFair}> The trade was considered fair </Typography> :
          <Typography className={classes.tradeNotFair}> The trade was not considered fair </Typography>}
        {opponent.map(creature => {
          return row(creature)
        })}
        {console.log(entry)}
      </Grid>
  )
}
export default function History() {
  const classes = useStyles()
  const [entries, setEntries] = useState([])
  const [noDataFound, setNoDataFound] = useState(true)

  useEffect(() => {
    const fetchData = async() => {
      const data = await fetchUserEntries()
      if (data.status === 200) {
        if (data.data instanceof String) {
          setNoDataFound(true)
        }
        if (data.data instanceof Array)
          setNoDataFound(false)
          setEntries(data.data)
      }
    }
    fetchData()
  }, [])

  return (
    <Grid container className={classes.body}>
      {noDataFound ?
        <Grid item sm={12}>
          <Typography className={classes.noEntries}> You have no entries so far </Typography>
        </Grid> :
        entries.map(entry => {
          return <EntryRow entry={entry} />
        })
      }
    </Grid>
  )
}
// <List className={classes.flexContainer}>
// {console.log("entries")}
// {console.log(entries)}
// { entries.length > 0 ? entries.map(function(entry) {
//     return <Grid item xs={12}><EntryRow entry={entry} /></Grid>
//   }) : console.log("diacho")}
// </List>
// {entries ? entries.forEach(entry => console.log(entry)) : ''}
