import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useModal } from 'mui-modal-provider'
import {Grid, Typography, List, ListItem, ListItemIcon, Checkbox, Button, Paper} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import SearchCreature from './../Dialogs/SearchCreature'
import SimulateTrading from './../Dialogs/SimulateTrading'
import { POKE_SPRITES_URL, POKE_SPRITES_FORMAT } from './../../api_urls'
const MAX_ITEMS = 6

const useStyles = makeStyles((theme) => ({
  body: {
    margin: 'auto',
    height: '70vh',
  },
  paper: {
    width: '100%',
    overflow: 'auto',
    height: '60vh',
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    margin: theme.spacing(0.5, 0),
    width: '90%',
  },
  transferList: {
    width: '30%'
  },
  playerTitle: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.medium,
    color: theme.palette.black.main,
    margin: '0 0 2rem 0'
  },
  middleColumn: {
    margin: '3rem 0 0 0',
    minWidth: '40vh',
  },
  addCreatureRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 2rem 0'
  },
  listRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    maxHeight: '10vh'
  },
  item: {
    fontWeight: theme.typography.medium,
    alignSelf: 'center',
    textTransform: 'capitalize'
  },
  maxItemsAlert: {
    color: 'red',
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.medium
  },
  buttonAddCreature: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  buttonText: {
    fontWeight: theme.typography.medium,
    textTransform: 'capitalize'
  },
  list: {
    height: '45vh',
    overflow: 'auto'
  }
}));


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function Content() {
  const classes = useStyles()
  const [checked, setChecked] = useState([])
  const [left, setLeft] = useState([])
  const [right, setRight] = useState([])
  const { showModal } = useModal()
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  };

  const handleAllRight = () => {
    setRight(right.concat(left))
    setLeft([])
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    setLeft(left.concat(right))
    setRight([])
  }

  const customList = (items, setItems) => (
    <Paper className={classes.paper} elevation={10}>
      <List dense className={classes.list} component="div" role="list">
        {items.map((item) => {
          const labelId = `transfer-list-item-${item.id}-label`;
          return (
              <ListItem key={item.id} role="listitem" button onClick={handleToggle(item)}>
                <Grid container className={classes.listRow}>
                  <Grid item sm={1}>
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.indexOf(item) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                  </Grid>
                  <Grid item sm={3}>
                    <img src={POKE_SPRITES_URL+item.id+POKE_SPRITES_FORMAT} className={classes.img} alt={"sprite"}/>
                  </Grid>
                  <Grid item sm={1}></Grid>
                  <Grid item sm={2}>
                    <Typography className={classes.item}>{item.name}</Typography>
                  </Grid>
                  <Grid item sm={2}></Grid>
                  <Grid item sm={2}>
                    <Typography className={classes.item}>{"exp. " + item.base_experience}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              );
            })}
          </List>
        <Button color="secondary"
                className={classes.buttonAddCreature}
                variant={items.length < MAX_ITEMS ? "contained" : "disabled" }
                onClick={() => showModal(SearchCreature, { open: true, items: items, setItems: setItems})}
                disableElevation>
          <Typography className={classes.buttonText}>Add pokemon</Typography>
        </Button>
      {items.length === MAX_ITEMS ? <Alert severity="error">You've already selected 6 creatures!</Alert>  : ''}
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.body}>
      <Grid item className={classes.transferList}>
        <Typography className={classes.playerTitle}> Player 1 </Typography>
        {customList(left, setLeft)}
      </Grid>
      <Grid item className={classes.middleColumn}>
        <Grid container direction="column" alignItems="center" >
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
          <Button color="secondary"
                  className={classes.button}
                  variant={"contained"}
                  onClick={() => showModal(SimulateTrading, {left: left, right: right})}
                  disableElevation>
            <Typography className={classes.buttonText}>Simulate trading!</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid item className={classes.transferList}>
        <Typography className={classes.playerTitle}> Player 2 </Typography>
        {customList(right, setRight)}
      </Grid>
    </Grid>
  );
}
