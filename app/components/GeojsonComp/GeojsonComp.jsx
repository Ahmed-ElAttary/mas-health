
import { useEffect } from 'react';
import { useCesium } from 'resium';
import { Color, GeoJsonDataSource, HeightReference } from 'cesium';
const colors = {
    bad:["#f00000","#ffa3a3"],
    weak:["#d07916","#ffae3d"],
    passed:["#ffeb0a","#fff3a8"],
    good : ["#00c8fa","#94e4ff"],
    excellent:["#00d62b","#96ff94"],
    
    }
const GeojsonComp = () => {
    const viewerCs= useCesium();


    useEffect(()=>{
        (async()=>{

            const data=await GeoJsonDataSource.load( "/shapefile.geojson");
            viewerCs.viewer.dataSources.add(data);
            
            const entities = data.entities.values;
            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i];
              entity.polygon.material = Color.CYAN.withAlpha(0.2);
              entity.polygon.outline = true;
              entity.polygon.outlineColor = Color.BLACK;
              entity.polygon.heightReference =
                    HeightReference.CLAMP_TO_GROUND;
                    // entity.polygon.extrudedHeight=1000*entity.properties._Shape_Area._value
            }
 
        })()
    },[])
  return (
    <div>
      
    </div>
  )
}

export default GeojsonComp
