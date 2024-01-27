import React,{useState} from 'react'
import { Sidebar } from 'primereact/sidebar';
export let openBottom;
const BottomSidebar = () => {
   
  const [bottomBarVis,setBottomBarVis] = useState(false);
  const [lastReadingID,setLastReadingID] = useState(false);
  openBottom = (id)=>{setBottomBarVis(true); 
    setLastReadingID(id)
  }
  return (
    <>
    <Sidebar visible={bottomBarVis} onHide={() => setBottomBarVis(false)} position="bottom" dir="rtl"> 
    {lastReadingID}
    </Sidebar>

         </>
  )
}

export default BottomSidebar
