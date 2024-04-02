import booleanWithin from "@turf/boolean-within";
import convex from "@turf/convex";
import * as data from "@public/shapefile.json";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const body = await req.json();
    const { gov_id, lon, lat } = body;
    if (gov_id && lon && lat) {
      var polygon = convex(
        data.features.find((el) => el.properties.id == gov_id)
      );

      var point = {
        type: "Feature",
        geometry: {
          coordinates: [lon, lat],
          type: "Point",
        },
      };

      const resData = booleanWithin(point, polygon) ? "valid" : "invalid";

      return NextResponse.json(resData, { status: 200 });
    } else {
      return NextResponse.json("error in given parameters", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json("there is an error", { status: 500 });
  }
}

// {"gov_id":10,
// "lon":30.560391,
// "lat" : 29.445169
// }

// 29.373143, 30.401071
