import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import ModalProvider,{ useModal } from 'mui-modal-provider'
import {Grid, DialogTitle, Typography, List, ListItem, ListItemIcon, ListItemText, Checkbox, Button, Paper} from '@material-ui/core'
import SearchCreature from './../SearchCreature'
import Dialog from '@material-ui/core/Dialog'

const useStyles = makeStyles((theme) => ({
  body: {
    margin: 'auto',
    height: '70vh',
  },
  paper: {
    width: '100%',
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  transferList: {
    width: '30%'
  },
  playerTitle: {
    fontFamily: 'Press Start 2P',
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.medium,
    color: theme.palette.grey.main,
    margin: '0 0 2rem 0'
  },
  middleColumn: {
    margin: '3rem 0 0 0'
  },
  addCreatureRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 2rem 0'
  },
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
  const [left, setLeft] = useState([0, 1, 2, 3])
  const [right, setRight] = useState([4, 5, 6, 7])
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
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <Typography>{`List item ${value + 1}`}</Typography>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      <div className={classes.addCreatureRow}>
        <Button color="primary"
                variant="contained"
                onClick={() => showModal(SearchCreature, { open: true, items: items, setItems: setItems})}
                disableElevation>
          Add pokemon
        </Button>
      </div>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.body}>
      <Grid item className={classes.transferList}>
        <Typography className={classes.playerTitle}> Host player </Typography>
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
        </Grid>
      </Grid>
      <Grid item className={classes.transferList}>
        <Typography className={classes.playerTitle}> Opponent player </Typography>
        {customList(right, setRight)}
      </Grid>
    </Grid>
  );
}
