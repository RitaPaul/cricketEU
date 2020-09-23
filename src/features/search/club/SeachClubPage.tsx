import React, { useContext, Fragment, useEffect } from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import ClubProfileHeader from '../../club/ClubProfileHeader';
import { RouteComponentProps } from 'react-router-dom';
interface RouteParams {
  id: string;
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> { }

const SearchClubPage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const {
    getClubProfile,
    loadingClubProfile,
    clubProfile,
  } = rootStore.clubProfileStore;
  const token = window.localStorage.getItem('jwt');

  useEffect(() => {
    if (match.params.id !== 'null') {      
        getClubProfile(match.params.id);
    } 
  }, [getClubProfile, match, isLoggedIn, user, token]);



  if (loadingClubProfile) return <LoadingComponent content='Loading club data...' />;
  return (
    <Fragment>
        <Grid>
          <Grid.Column width={16}>
            <ClubProfileHeader
              clubProfile={clubProfile!}
            />    
          </Grid.Column>
        </Grid>
    </Fragment>
  );
};

export default observer(SearchClubPage);

