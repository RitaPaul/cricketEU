import React, { useContext } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import { ITeams } from '../../../app/models/clubProfile';
import { FORM_ERROR } from 'final-form';

const validate = combineValidators({
    teamname: composeValidators(
        isRequired('Club name'),
        hasLengthGreaterThan(0)({
            message: 'teamname needs to be at least 1 characters'
        })
    )(),
});

const TeamForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { newClubTeam, loading } = rootStore.clubProfileStore;
    return (
        <FinalForm
            validate={validate}
            onSubmit={(values: ITeams) =>
                newClubTeam(values.teamname).catch(error => ({
                    [FORM_ERROR]: error
                }))
            }
            render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading} style={{ zIndex: '200'}}>
                    <Header
                        as='h2'
                        content='Add new team'
                        color='teal'
                        textAlign='center'
                    />
                    <Field
                        component={TextInput}
                        name='teamname'
                        placeholder='Teamname eg: Team A'
                    />
                    <Button
                        loading={loading}
                        disabled={loading || invalid || pristine}
                        floated='right'
                        positive
                        type='submit'
                        content='Submit'
                    />
                </Form>
            )}
        />

    );
};

export default observer(TeamForm);
