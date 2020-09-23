import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { category } from '../../../app/common/options/categoryOptions';
import { combineDateAndTime } from '../../../app/common/util/util';
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  street: isRequired('street'),
  pincode: isRequired('Area code is required'),
  city: isRequired('City is required'),
  date: isRequired('Date is required'),
  time: isRequired('Time is required')
});

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity
  } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);
  const { isMatch } = rootStore.commonStore;

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then(activity => {
           setActivity(new ActivityFormValues(activity));
        })
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name='title'
                  options={category}
                  component={SelectInput}
                  placeholder='Activity Type'
                  value={activity.title}
                />
                {isMatch &&
                  <Field
                    component={TextInput}
                    name='vsTeam'
                    placeholder='vsTeam'
                    value={activity.vsTeam}
                  />}
                <Field
                  name='description'
                  placeholder='Description'
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput}
                />
                   <Field
                  name='street'
                  placeholder='street'
                  rows={2}
                  value={activity.street}
                  component={TextAreaInput}
                />
                <Field
                    component={TextInput}
                    name='pincode'
                    placeholder='Pin Code ex: 2635'
                    value={activity.pincode}
                  />
                <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={activity.date}
                  />
                  <Field
                    component={DateInput}
                    name='time'
                    time={true}
                    placeholder='Time'
                    value={activity.time}
                  />
                </Form.Group>

                <Field
                  component={TextInput}
                  name='city'
                  placeholder='City'
                  value={activity.city}
                />
             
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push('/activities')
                  }
                  disabled={loading}
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
