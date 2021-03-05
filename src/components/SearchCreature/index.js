import React, {useState} from 'react'
import {Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { retrieveResourceByName } from './thirdPartyAPI.js'
import { POKE_SPRITES_URL, POKE_SPRITES_FORMAT } from './../../api_urls'

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: '40vh',
    maxHeight: '80vh',
    padding: '1rem'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem'
  },
  button: {
    textTransform: 'none'
  },
}))

const useStylesCreatureRow = makeStyles((theme) => ({
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem',
    width: '95%'
  },
  img: {
    maxHeight: '10vh'
  }
}))

function CreatureRow(props) {
  const classes = useStylesCreatureRow()
  const creature = props.creature
  const sprite = POKE_SPRITES_URL + creature.id + POKE_SPRITES_FORMAT
  return (
    <Grid container className={classes.body}>
      <Grid item xs={3}>
        <img src={sprite} className={classes.img} />
      </Grid>
      <Grid item xs={3}>
        {creature.name}
      </Grid>
      <Grid item xs={3}>
        {"exp. " + creature.base_experience}
      </Grid>
      <Grid item xs={3}>
        <Button color="secondary"> Add </Button>
      </Grid>
    </Grid>
  )
}

export default function SearchCreature(props){
  const classes = useStyles()
  const [open, setOpen] = useState(props.open);
  const [localItems, setLocalItems] = useState(props.items)
  const [creature, setCreature] = useState(false)
  const [creatureName, setCreatureName] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setItems = () => {
    props.setItems(localItems)
  }

  const handleChange = (e) => {
    setCreatureName(e.target.value)
  }

  const retrieveResource = async(event) => {
    const response = await retrieveResourceByName(creatureName.toLowerCase())
    if(response) {
      setCreature(response.data)
      console.log(response.data)
    } else {
      setCreature('')
    }
  }

  return (
    <>
    <Dialog open={open} classes={{ paper: classes.dialogPaper}} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Search a pokemon</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type the name of the pokemon in the form below
            </DialogContentText>
          <TextField
            autoFocus
            id="name"
            onChange={handleChange}
            label="e.g Charmander"
            fullWidth
            />
        </DialogContent>
        <DialogActions>
        </DialogActions>
        {creature ? <CreatureRow creature={creature} /> : ''}
        <Grid container className={classes.buttonRow}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" style={{textTransform: 'none'}} color="primary" onClick={retrieveResource}>
            Search
          </Button>
        </Grid>
      </Dialog>
    </>
  )
}
