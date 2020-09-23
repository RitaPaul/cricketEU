import React, {  useContext } from 'react'
import { FieldRenderProps} from 'react-final-form';
import { FormFieldProps, Form, Label, Select } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../stores/rootStore';

interface IProps
  extends FieldRenderProps<string, HTMLSelectElement>,
  FormFieldProps { }

const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  label,
  placeholder,
  meta: { touched, error }
}) => {
  const rootStore = useContext(RootStoreContext);
  const {isOther, isOtherHandler, isMatch, isMatchHandler} = rootStore.commonStore;
  const { name, value } = input; 
  if(name === 'joinAs' && value === 'Other' && !isOther) {
    isOtherHandler(true);
  } 
  if(name === 'joinAs' && value !== 'Other' && isOther) {
    isOtherHandler(false);
  } 

  if(name === 'title' && value === 'Match' && !isMatch) {
    isMatchHandler(true);
  } 
  if(name === 'title' && value !== 'Match' && isMatch) {
    isMatchHandler(false);
  } 

  return (
      <Form.Field error={touched && !!error} width={width}>
        {label && <Label basic color='orange' pointing='below'>{label}</Label>}
        <Select
          value={input.value}
          onChange={(e, data) => input.onChange(data.value)}
          placeholder={placeholder}
          options={options}
        />
        {touched && error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
      </Form.Field>     
  )
}

export default observer(SelectInput)
