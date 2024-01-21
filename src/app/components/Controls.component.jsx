import React, { useState, useEffect, Children, useRef } from "react";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import BasicDemo from "./Dock.component"
const Controls = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Sidebar visible={visible} onHide={() => setVisible(false)} position="right" dir="rtl"> 
                <h2>Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </Sidebar>
            <Button style={{   
    position: "absolute",
    top: 0,
    right: 0}} icon="pi pi-search" onClick={() => setVisible(true)} />
    {/* <BasicDemo/> */}
    </>
  )
}

export default Controls;
