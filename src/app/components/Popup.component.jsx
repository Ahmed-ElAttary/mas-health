import { PropsWithChildren } from 'react';
import './Popup.styles.css';


export default function PopupComponent({ children,closePopup, ...props }){

  return (
    <div {...props} className={`popupComponent ${props.className}`}>
      <div className="pop-content">
        <div>
<button className='pop-close' onClick={closePopup}>X</button>
        </div>
        
        {children}</div>
      <div className="pop-arrow">
        <span className="pop-arrow-content" />
      </div>
    </div>
  )
}