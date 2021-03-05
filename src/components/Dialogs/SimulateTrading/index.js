import React, {useState, useEffect} from 'react'
import {Grid, Snackbar, Typography, Button, Dialog} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import {saveEntry} from './saveEntry'
import Check from './../../../assets/check.svg'
import Close from './../../../assets/close.svg'
const LOWER_BOUND = 0.85
const UPPER_BOUND = 1.15

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: '60vh',
    maxHeight: '70vh',
    padding: '1.5rem',
    minWidth: '15%',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem'
  },
  button: {
    textTransform: 'none'
  },
  veredictUpperText: {
    textTransform: 'capitalize',
    fontSize: 60,
    fontWeight: theme.typography.hairline
  },
  veredictBottomText: {
    textTransform: 'capitalize',
    fontSize: 60,
    fontWeight: theme.typography.medium
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  imgWrapper: {
    height: '25vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    maxHeight: '15vh'
  },
  saveToHistoryWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.bold
  }
}))

export default function SimulateTrading(props){
  const classes = useStyles()
  const [open, setOpen] = useState(props.open)
  const [saveEntrySuccess, setSaveEntrySuccess] = useState()
  const [isTradeFair, setIsTradeFair] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const left = props.left
  const right = props.right

  useEffect(() => {
    setIsTradeFair(calculateTradingFairness())
  }, [])

  const sumArray = (arr) => {
    return arr.reduce((acc, curr, index, array) => {
      let creature = array[index]
      let base_exp = creature.base_experience
      return acc + parseInt(base_exp)
    }, 0)
  }

  const difference = (a, b) => {
    return Math.abs(a/b)
  }

  const calculateTradingFairness = () => {
    const sum_left = sumArray(left)
    const sum_right = sumArray(right)
    const diff = difference(sum_left, sum_right)
    if (diff >= LOWER_BOUND && diff <= UPPER_BOUND) {
      return true
    }
    return false
  }

  const handleClose = () => {
    setOpen(false)
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleClick = async(event) => {
    const response = await saveEntry(left, right, isTradeFair)
    if(response.status === 200) {
      setSaveEntrySuccess(true)
      setSnackbarOpen(true)
    } else {
      setSaveEntrySuccess(false)
      setSnackbarOpen(true)
    }
  }

  return (
    <>
      <Dialog open={open} classes={{ paper: classes.dialogPaper}} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Grid container>
          <Grid item sm={12} className={classes.textWrapper}>
            <Typography className={classes.veredictUpperText}> Your trade </Typography>
          </Grid>
          <Grid item sm={12} className={classes.textWrapper}>
            <Typography className={classes.veredictBottomText}> {isTradeFair ? "is fair!" : "is not fair :("} </Typography>
          </Grid>
          <Grid item sm={12} className={classes.imgWrapper}>
            {isTradeFair ? <img src={Check} className={classes.img} height="auto" alt={"check"}/> : <img src={Close} className={classes.img} height="auto" alt={"close"}/>}
          </Grid>
          <Grid item sm={12} className={classes.saveToHistoryWrapper}>
            <Button onClick={() => handleClick()} className={classes.link} >Save to your history</Button>
          </Grid>
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
         {saveEntrySuccess ?
           <Alert onClose={handleSnackbarClose} severity="success">
              <Typography>Your simulation was recorded!</Typography>
            </Alert> :
            <Alert onClose={handleSnackbarClose} severity="error">
               <Typography>There was an error with your request :(</Typography>
            </Alert>
          }
        </Snackbar>
      </Dialog>
    </>
  )
}
