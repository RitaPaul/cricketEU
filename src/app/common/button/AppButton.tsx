import React from 'react';
import css from './AppButton.module.css';
import { Icon, } from 'semantic-ui-react';



const getButtonClass = (buttonType: string) => {
  switch (buttonType) {
    case 'full':
      return css.button_full
    case 'border':
      return css.button_border
    case 'wait':
      return css.button_onwait
    default:
      break;
  }
}

const getContentClass = (contentClass: string) => {
  switch (contentClass) {
    case 'follow':
      return css.follow
    case 'onfollow':
      return css.onfollow
    case 'onwait':
      return css.onwait
    default:
      break;
  }
}

// const renderButtonContent = (isLoading: boolean, content: string, contentClass: string, id?: string) =>  {
//   if(isLoading) {
//     return <span key={id} className={getContentClass(contentClass)}> <Icon loading name='spinner' /> </span>
//   }

//   return <span key={id} className={getContentClass(contentClass)}> { content} </span>
// }

type AppButtonProps = {
  buttonType: string,
  buttonContent: any,
  contentClass: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export const AppButton: React.FC<AppButtonProps> = ({ onClick, buttonContent, buttonType, contentClass}) => {
return <button  className={getButtonClass(buttonType)} onClick={onClick}>
     <span className={getContentClass(contentClass)}> {buttonContent} </span>
  </button>
}

type AppButtonLoadingProps = {
  buttonType: string,
  contentClass: string,
}
export const AppButtonLoading: React.FC<AppButtonLoadingProps> = ({ buttonType, contentClass }) => {
  return <button className={getButtonClass(buttonType)}>
    <span className={getContentClass(contentClass)}> <Icon loading name='spinner' /> </span>
  </button>
}