import React, { useContext } from 'react';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: '90%',
      maxWidth: 600,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const SearchModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const { searchModal: { openSearchModal, bodySearchModal }, closeSearchModal } = rootStore.modalStore;
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);


  const modalbody = (
    <div className={classes.paper}>
      {bodySearchModal}
      {/* use following <SimpleModal/> if want to open modal inside model */}
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <div>
      <Modal
        open={openSearchModal}
        className={classes.modal}
        onClose={closeSearchModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSearchModal}>
          {modalbody}
        </Fade>
      </Modal>
    </div>
  );
}
export default observer(SearchModalContainer);
