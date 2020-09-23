import React, { useContext } from 'react';
import { Form, Button,} from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { clubType } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { IClubProfile } from '../../../app/models/clubProfile';

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
    pincode: isRequired('Pin code')
});

interface IProps {
    updateClub: (profile: Partial<IClubProfile>) => void;
    club: IClubProfile;
}

const ClubEditForm: React.FC<IProps> = ({ updateClub, club }) => {
    const rootStore = useContext(RootStoreContext);
    const { loading } = rootStore.clubStore;

    return (
        <FinalForm
            validate={validate}
            onSubmit={updateClub}
            initialValues={club!}
            render={({ handleSubmit, invalid, pristine, submitting }) => (
                <Form onSubmit={handleSubmit} error>
                    <Field
                        component={TextInput}
                        name='clubname'
                        placeholder='Clubname eg: Ishoj Cricket Club'
                        value={club.clubname}
                    />
                    <Field
                        component={TextInput}
                        name='displayname'
                        placeholder='Display name eg: ICC'
                        value={club.displayname}
                    />
                    <Field
                        component={TextAreaInput}
                        name='clubBio'
                        placeholder='More about club...'
                        rows={3}
                        value={club.clubBio}
                    />
                    <Field
                        component={DateInput}
                        name='originAt'
                        date={true}
                        placeholder='Origin date of club'
                        value={club.originAt}
                    />
                    <Field
                        name='type'
                        placeholder='Select type'
                        component={SelectInput}
                        options={clubType}
                        value={club.type}
                    />
                    <Field
                        name='street'
                        placeholder='Street'
                        component={TextInput}
                        value={club.street}
                    />
                    <Field
                        name='country'
                        placeholder='Country'
                        component={TextInput}
                        value={club.country}
                    />
                    <Field
                        component={TextInput}
                        name='pincode'
                        placeholder='Area Code ex: 2635'
                        value={club.pincode}
                    />
                    <Field
                        component={TextInput}
                        name='city'
                        placeholder='City'
                        value={club.city}
                    />
                    <Button
                        loading={submitting}
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

export default observer(ClubEditForm);
