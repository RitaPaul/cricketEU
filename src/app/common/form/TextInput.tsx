import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

interface IProps
  extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  value,
  placeholder,
  label,
  disabled,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
    {label && <Label basic color='orange' pointing='below'>{label}</Label>}    
      <input {...input} placeholder={placeholder} disabled={disabled}/>
      {touched && error && (
        <Label basic color='blue'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
