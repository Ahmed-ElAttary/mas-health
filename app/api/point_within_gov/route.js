import booleanWithin from "@turf/boolean-within";
import * as data from "@public/simplified.json";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const body = await req.json();
    const { gov_id, lon, lat } = body;
    if (gov_id && lon && lat) {
      var feature = data.features.find((el) => el.properties.id == gov_id);
      var point = {
        type: "Feature",
        geometry: {
          coordinates: [lon, lat],
          type: "Point",
        },
      };

      const resData = booleanWithin(point, feature) ? "valid" : "invalid";

      return NextResponse.json(resData, { status: 200 });
    } else {
      return NextResponse.json("error in given parameters", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(`there is an error ${err}`, { status: 500 });
  }
}

// function neglectHoles(feature) {
//   const { coordinates } = feature.geometry;
//   feature.geometry.coordinates = coordinates.map((el) => {
//     if (el.length == 1) {
//       return el;
//     }
//     if (el.length > 1) {
//       return [el[0]];
//     }
//   });
//   return feature;
// }
