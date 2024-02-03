import React, { useState } from 'react'
import Marker from './Marker'




const Markers = () => {
  const [allData,setAllData] =useState([{id:1,lat:30,lon:31,name:"محطة 1",type:"Aaaaa",color:"bad",legal:"مطابق",status:"تحت الصيانة"},{id:2,lat:26,lon:31,name:"محطة 2",type:"Aaaaa",color:"good" ,legal:"غير مطابق",status:"تعمل"},{id:3,lat:29,lon:32,name:"محطة 3",type:"Aaaaa",color:"excellent" ,legal:"غير مطابق",status:"لا تعمل"}]);
  return (
    <>

{
  allData.map((data)=>{return(
<Marker  data={data} key={data.id} />
  )})
}


    </>
  )
}

export default Markers
