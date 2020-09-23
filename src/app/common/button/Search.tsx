import React from 'react';
import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);


export default function CustomizedButtons() {
  const classes = useStyles();

  return (
    <div>
      <ColorButton variant="contained" color="primary" className={classes.margin}>
        Custom CSS
      </ColorButton>     
    </div>
  );
}
