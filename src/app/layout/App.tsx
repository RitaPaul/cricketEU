import React, { useEffect, useContext } from 'react';
import HomePage from '../../features/home/HomePage';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { RootStoreContext } from '../stores/rootStore';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ProfilePage from '../../features/profiles/ProfilePage';
import NotFound from './NotFound';
import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import HasRightRoute from './HasRightRoute';
import ClubPage from '../../features/club/ClubPage';
import SearchClubPage from '../../features/search/club/SeachClubPage';
import ClubForm from '../../features/club/form/ClubForm';
import SearchFormForPage from '../../features/search/pageSearchForm/SearchFormForPage';
import TopBar from '../../features/nav/TopBar';
import SearchModalContainer from '../common/modals/SearchModalContainer';
import { Footer } from '../../features/footer/Footer';
import ModalContainer from '../common/modals/ModalContainer';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded) return <LoadingComponent content='Loading app' />
  return (
    <div className='app_body_content'>
      <SearchModalContainer />
      <ModalContainer />
      <ToastContainer position='bottom-right' />

      <div>
        <TopBar />
        <div>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <PrivateRoute exact path='/activities' component={ActivityDashboard} />
            <PrivateRoute path='/activities/:id' component={ActivityDetails} />
            <HasRightRoute
              key={location.key}
              path={['/createActivity', '/manage/:id']}
              component={ActivityForm}
            />
            <PrivateRoute path='/playerprofile/:username' component={ProfilePage} />
            <PrivateRoute path={`/user/:username/:id`} component={ClubPage} />
            <PrivateRoute path={'/:username/register/club'} component={ClubForm} />
             <Route
                exact
                path={`/clubs`}
                component={SearchFormForPage}
              />
             <Route
                path={[`/clubs/search/:searchQuery/predicate/:predicate`,
                  `/clubs/search/:searchQuery`,
                  `/clubs/predicate/:predicate`]}
                component={SearchFormForPage}
              />
              <Route path={`/club/:id`} component={SearchClubPage} />              
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(observer(App));
