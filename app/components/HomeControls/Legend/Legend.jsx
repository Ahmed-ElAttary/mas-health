import React from 'react'
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Divider } from 'primereact/divider';

import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { ScrollPanel } from 'primereact/scrollpanel';
const avatar =(color)=>`data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="${color}"/></svg>`)}`
const Legend = () => {
  return (
     <Inplace  closable>
   <InplaceDisplay>

   <Button icon="pi pi-map"  />
   </InplaceDisplay>
   <InplaceContent>

<Fieldset legend={<div className="flex align-items-center text-primary">
            <span className="pi pi-map mr-2"></span>
            <span className="font-bold text-lg">Legend</span>
        </div>}>
<ScrollPanel style={{height: '600px' }}>

  <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
  <Divider type="solid" >المواقع</Divider>
<Chip label="نقطة رصد دورية" image="star-circle-fill-svgrepo-com.svg" />
<Chip label="مأخذ محطة تنقية مياه" image="marker-svgrepo-com.svg" />
<Chip label="رصد لحظي مستمر" image="marker-svgrepo-com.svg" />
<Chip label="مواقع الرصد البحثية" image="marker-svgrepo-com.svg" />
<Chip label="مواقع رصد الأحداث الطارئة" image="marker-svgrepo-com.svg" />

<Divider type="solid" >الحالة</Divider>
    <Chip label="تعمل" image="green-static.png" />
    <Chip label="لا تعمل" image="red-static.png" />
    <Chip label="تحت الصيانة" image="yellow-static.png" />
    {/* <Divider type="solid" >المطابقة</Divider>
    <Chip label="مطابق" image="right.png" />
    <Chip label="غير مطابق" image="wrong.png" /> */}
    <Divider type="solid" >WQI</Divider>
    <Chip label="سيئة" image={avatar("#f00000")} />
    <Chip label="ضعيفة" image={avatar("#d07916")} />  
    <Chip label="مقبولة" image={avatar("#ffeb0a")} />
    <Chip label="جيدة" image={avatar("#00c8fa")} />  
    <Chip label="ممتازة" image={avatar("#00d62b")} /> 

    </div>

    </ScrollPanel>
</Fieldset>
</InplaceContent>
</Inplace>
  )
}

export default Legend
