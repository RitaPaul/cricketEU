import React, { useContext } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import { ITeams } from '../../../app/models/clubProfile';
import { FORM_ERROR } from 'final-form';



const TeamDeleteForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { deleteClubTeam, loading, selectedTeam } = rootStore.clubProfileStore;
    const {closeModal} = rootStore.modalStore;
    return (
        <FinalForm
            initialValues={selectedTeam}
            onSubmit={(values: ITeams) =>
                deleteClubTeam(values).catch(error => ({
                    [FORM_ERROR]: error
                }))
            }
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} loading={loading} style={{ zIndex: '200' }}>
                    <Header
                        as='h2'
                        content='Edit team'
                        color='teal'
                        textAlign='center'
                    />
                    <Field
                        disabled
                        component={TextInput}
                        name='teamname'
                        value={selectedTeam!.teamname}
                    />
                    <Button.Group floated='right'>
                        <Button
                            positive
                            type='button'
                            content='Cancel'
                            onClick={() => closeModal()}
                        />
                        <Button.Or />
                        <Button
                            loading={loading}
                            negative
                            type='submit'
                            content='Delete'
                        />
                    </Button.Group>

                </Form>
            )}
        />

    );
};

export default observer(TeamDeleteForm);
