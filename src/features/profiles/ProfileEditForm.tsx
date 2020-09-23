import React, { Fragment, useContext } from 'react';
import { IPlayerProfile } from '../../app/models/profile';
import { Form as FinalForm, Field } from 'react-final-form';
import { observer } from 'mobx-react-lite';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import { batsmanCategory, playerJoinCategory, bowlerCategory } from '../../app/common/options/categoryOptions';
import SelectInput from '../../app/common/form/SelectInput';
import DateInput from '../../app/common/form/DateInput';
import { RootStoreContext } from '../../app/stores/rootStore';

const validate = combineValidators({
  displayName: isRequired('Display name is required'),
  joinDate: isRequired('Join date is required'),
  joinAs: isRequired('Join as is required'),
});

interface IProps {
  updateProfile: (profile: Partial<IPlayerProfile>) => void;
  profile: IPlayerProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  const rootStore = useContext(RootStoreContext);
  const { isOther } = rootStore.commonStore;
  const { loading } = rootStore.profileStore;

  return (
    <FinalForm
      onSubmit={updateProfile}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting, }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            label='Display name'
            name='displayName'
            component={TextInput}
            placeholder='Display Name'
            value={profile!.displayName}
          />
          <Field
            label='More about you'
            name='bio'
            component={TextAreaInput}
            rows={3}
            placeholder='Bio'
            value={profile.bio}
          />
          <Field
            label='Join date'
            name='joinDate'
            component={DateInput}
            placeholder='Join date'
            date={true}
            value={profile.joinDate}
          />
          <Field
            label='Join as'
            name='joinAs'
            options={playerJoinCategory}
            component={SelectInput}
            placeholder='Join as'
            value={profile.joinAs}
          />
          {!isOther ?
            <Fragment>
              <Field
                label='Batsman'
                name='batsman'
                options={batsmanCategory}
                component={SelectInput}
                placeholder='Batsman'
                value={profile.batsman}
              />
              <Field
                label='Bowler'
                name='bowler'
                options={bowlerCategory}
                component={SelectInput}
                placeholder='Bowler'
                value={profile.bowler}
              />
            </Fragment>
            :
            <Field
              label='Join as other'
              name='other'
              component={TextInput}
              placeholder='Coach/Manager/Head'
              value={profile.other}
            />
          }
          <Field
            label='Previous club name'
            name='previousClubName'
            component={TextInput}
            placeholder='Previous Club Name(if any)'
            value={profile.previousClubName}
          />
          <Button
            loading={submitting}
            floated='right'
            disabled={loading || invalid || pristine}
            positive
            content='Update profile'
          />
        </Form>
      )}
    />
  );
};

export default observer(ProfileEditForm);
