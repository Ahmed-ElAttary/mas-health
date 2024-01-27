import React,{useState} from 'react'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
const RightSidebar = () => {
    const [sideBarVis, serSideBarVis] = useState(false);
  return (
    <>
    <Sidebar visible={sideBarVis} onHide={() => serSideBarVis(false)} position="right" dir="rtl"> 

    </Sidebar>
     <Button  icon="pi pi-search" onClick={() => serSideBarVis(true)} />
         </>
  )
}

export default RightSidebar
