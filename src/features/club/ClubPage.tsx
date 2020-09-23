import React, { useContext, Fragment, useEffect } from 'react';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Grid, Button } from 'semantic-ui-react';
import ClubProfileHeader from './ClubProfileHeader';
import ClubContent from './ClubContent';
import { RouteComponentProps } from 'react-router-dom';

interface RouteParams {
  id: string;
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> { }

const ClubPage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const {
    getClubProfile,
    loading,
    loadingClubProfile,
    clubProfile,
    renderClubForm,
    setActiveTab,
  } = rootStore.clubProfileStore;
  const token = window.localStorage.getItem('jwt');

  useEffect(() => {
    if (match.params.id !== 'null' && isLoggedIn && user && token) {
      if (user.username === match.params.username) {
        getClubProfile(match.params.id);
      } else {
        renderClubForm()
      }
    } 
  }, [getClubProfile, match, isLoggedIn, user, token, renderClubForm]);

  if (loading || loadingClubProfile) return <LoadingComponent content='Loading club data...' />;
  return (
    <Fragment>
      {clubProfile === null ? <Button onClick={() => renderClubForm()} type='button' content='New Club' /> :
        <Grid>
          <Grid.Column width={16}>
            <ClubProfileHeader
              clubProfile={clubProfile!}
            />
            {match.params.id !== 'null' && isLoggedIn && user && token
              ? <ClubContent setActiveTab={setActiveTab} />
              : null}

          </Grid.Column>
        </Grid>}
    </Fragment>


  );
};

export default observer(ClubPage);

