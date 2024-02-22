import { Card } from "primereact/card";

import "./Popup.styles.css";
import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import { Fieldset } from "primereact/fieldset";
export default function PopupComponent({ children, closePopup, ...props }) {
  const op = useRef(null);
  return (
    <Card {...props} className={`popupComponent ${props.className}`}>
      <Button
        className="pop-close"
        icon="pi pi-times"
        severity="danger"
        onClick={closePopup}
      />

      <div className="pop-content">{children}</div>

      <div className="pop-arrow"> 
        <div className="pop-arrow-content" />
      </div>
    </Card>
    
  );
}
