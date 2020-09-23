import React, { useContext } from 'react';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 0,
    },
  }),
);
const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const { modal: { open, body }, closeModal } = rootStore.modalStore;
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);


  const modalbody = (
    <div style={modalStyle} className={classes.paper}>
      {body}
      {/* use following <SimpleModal/> if want to open modal inside model */}
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalbody}
      </Modal>
    </div>
  );
}
export default observer(ModalContainer);
