import React, { useContext } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { clubType } from '../../../app/common/options/categoryOptions';
import { IClubFormValues } from '../../../app/models/club';
import { FORM_ERROR } from 'final-form';
import DateInput from '../../../app/common/form/DateInput';

const validate = combineValidators({
    clubname: composeValidators(
        isRequired('Club name'),
        hasLengthGreaterThan(3)({
            message: 'Clubname needs to be at least 4 characters'
        })
    )(),
    displayname: composeValidators(
        isRequired('Display name'),
        hasLengthGreaterThan(2)({
            message: 'Display name needs to be at least 3 characters'
        })
    )(),
    originAt: isRequired('Foundation date of club'),
    type: isRequired('Type of club'),
    country: isRequired('Country'),
    city: isRequired('City'),
    street: isRequired('street'),
    pincode: isRequired('Area/post code')
});


const ClubForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { registerClub, loading } = rootStore.clubStore;

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        onSubmit={(values: IClubFormValues) =>
                            registerClub(values).catch(error => ({
                                [FORM_ERROR]: error
                            }))
                        }
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    component={TextInput}
                                    name='clubname'
                                    placeholder='Clubname eg: Ishoj Cricket Club'
                                />
                                <Field
                                    component={TextInput}
                                    name='displayname'
                                    placeholder='Display name eg: ICC'
                                />
                                <Field
                                component={DateInput}
                                name='originAt'
                                date={true}
                                placeholder='Origin date of club'
                                />
                                <Field
                                    name='type'
                                    placeholder='Select type'
                                    component={SelectInput}
                                    options={clubType}
                                />
                                <Field
                                    name='street'
                                    placeholder='Street'
                                    component={TextInput}
                                />
                                <Field
                                    name='country'
                                    placeholder='Country'
                                    component={TextInput}
                                />
                                <Field
                                    component={TextInput}
                                    name='pincode'
                                    placeholder='Pin Code ex: 2635'
                                />

                                <Field
                                    component={TextInput}
                                    name='city'
                                    placeholder='City'
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
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ClubForm);
