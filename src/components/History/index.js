import React, {useState, useEffect,useRef} from 'react'
import {Grid, Divider, Typography,Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fetchUserEntries } from './fetchUserEntries'
import { POKE_SPRITES_URL, POKE_SPRITES_FORMAT } from './../../api_urls'

const useStyles = makeStyles((theme) => ({
  body: {
    margin: '4rem 0 0 0',
    height: '70vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5rem',
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
    maxWidth: '100%',
    margin: '0 0 12rem 0'
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
  },
  creatureRow: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '100%'
  }
}))


const EntryRow = (props) => {
  const classes = useStylesEntryRow()
  const entry = props.entry
  const host = JSON.parse(entry.host)
  const opponent = JSON.parse(entry.opponent)

  const row = (creature) => {
    return <div class="row">
            <img src={POKE_SPRITES_URL + creature.id + POKE_SPRITES_FORMAT} />
            <Typography className={classes.name}>{creature.name}</Typography>
            <Typography>"Exp. " + {creature.base_experience}</Typography>
          </div>
  }

  return (
        <Grid container className={classes.body}>
          <Grid item xs={4}  className={classes.creatureRow}>
            {host.map(creature => {
              return row(creature)
            })}
          </Grid>
          <Grid item xs={4}>
            {entry.isTradeFair ?
              <Typography className={classes.tradeFair}> The trade was considered fair </Typography> :
              <Typography className={classes.tradeNotFair}> The trade was not considered fair </Typography>}
          </Grid>
          <Grid item xs={4} className={classes.creatureRow}>
            {opponent.map(creature => {
              return row(creature)
            })}
          </Grid>
        </Grid>
  )
}
export default function History() {
  const firstUpdate = useRef(true)
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
        <Grid item sm={12}>
          {entries.map(entry => {
            return <EntryRow entry={entry} />
          })}
        </Grid>
      }
    </Grid>
  )
}
