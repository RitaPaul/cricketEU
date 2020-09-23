import React, { useContext } from 'react'
import { RouteProps, RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';

interface IProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>
}

const HasRightRoute: React.FC<IProps> = ({component: Component, ...rest}) => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, hasClub} = rootStore.userStore;
    // const {isCurrentUserAndClub} = rootStore.clubStore;
    // console.log(isCurrentUserAndClub);
    return (
        <Route 
            {...rest}
            render={(props) => isLoggedIn && hasClub ? <Component {...props}/> : <Redirect to='/' />}
        />
    )
}

export default observer(HasRightRoute)
