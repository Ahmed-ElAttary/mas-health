import React, { useState } from 'react'
import Marker from './Marker'
import { openBottom } from "../HomeControls/BottomSidebar/BottomSidebar";



const Markers = () => {
  const [data,setData] =useState([{id:1,lat:30,lon:31,name:"محطة 1",type:"Aaaaa",color:"bad"},{id:2,lat:26,lon:31,name:"محطة 2",type:"Aaaaa",color:"good"}]);
  return (
    <>

{
  data.map(({id,lat,lon,name,type,color})=>{return(
<Marker  color={color} lon={lon} lat={lat} idd={id} key={id} popupContent={<>
<div>
{name}
</div>
<button onClick={() => openBottom(name)} >عرض أخر قراءة</button></>}/>
  )})
}


    </>
  )
}

export default Markers
