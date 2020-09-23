import React, { useContext} from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
  username: isRequired('Username'),
  displayName: isRequired('DisplayName'),
  email: isRequired('Email'),
  password: isRequired('Password')
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register, initUser } = rootStore.userStore;

  // useEffect(() => {
  //   if (!initUserForm) {
  //     initializeLoginForm();
  //   }
  // }, [initUserForm, initializeLoginForm])
  // const handleSubmit = (values: any) => {
  //   const {batsman, bowler, ...rest} = values;
  //   console.log(rest);
  // }
  return (
    <FinalForm
      // onSubmit={handleSubmit}
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      initialValues={initUser!}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
          <Form onSubmit={handleSubmit} error>
            <Header
              as='h2'
              content='Sign up to CricketEU'
              color='teal'
              textAlign='center'
            />
            {/* <Field name='currentClubName' component={TextInput} disabled placeholder='Current club name' /> */}
            <Field name='username' component={TextInput} placeholder='Username' />
            <Field
              name='displayName'
              component={TextInput}
              placeholder='Display Name'
            />            
            <Field name='email' component={TextInput} placeholder='Email' />
            <Field
              name='password'
              component={TextInput}
              placeholder='Password'
              type='password'
            />
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage
                error={submitError}
              />
            )}
            <Button
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              loading={submitting}
              color='teal'
              content='Register'
              fluid
            />
          </Form>
        )}
    />
  );
};

export default observer(RegisterForm);
