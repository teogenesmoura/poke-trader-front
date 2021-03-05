import React, {useState} from 'react'
import {Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { retrieveResourceByName } from './thirdPartyAPI.js'
import CreatureRow from './../CreatureRow'

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: '30vh',
    maxHeight: '70vh',
    padding: '1rem',
    minWidth: '35%'
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


export default function SearchCreature(props){
  const classes = useStyles()
  const [open, setOpen] = useState(props.open);
  const [creature, setCreature] = useState(false)
  const [creatureName, setCreatureName] = useState('')


  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCreatureName(e.target.value)
  }

  const pokemonIChooseYou = (creature) => {
    props.setItems(prevState => [...prevState, creature])
  }

  const retrieveResource = async(event) => {
    const response = await retrieveResourceByName(creatureName.toLowerCase())
    if(response) {
      setCreature(response.data)
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
        {creature ? <CreatureRow creature={creature} pokemonIChooseYou={pokemonIChooseYou} /> : ''}
        <Grid container className={classes.buttonRow}>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button variant="outlined" style={{textTransform: 'none'}} color="primary" onClick={retrieveResource}>
            Search
          </Button>
        </Grid>
      </Dialog>
    </>
  )
}
