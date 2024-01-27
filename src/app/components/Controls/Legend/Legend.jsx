import React from 'react'
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
const Legend = () => {
  return (
<Card title="Legend" >
    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

<Chip label="محطة رصد" image="star-circle-fill-svgrepo-com.svg" />
<Chip label="نقطة رصد" image="marker-svgrepo-com.svg" />

    </div>
</Card>
  )
}

export default Legend
