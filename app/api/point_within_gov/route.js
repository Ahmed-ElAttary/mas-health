import booleanWithin from "@turf/boolean-within";
import * as data from "@public/shapefile.json";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const body = await req.json();
    const { gov_id, lon, lat } = body;
    if (gov_id && lon && lat) {
      var polygon = data.features.find((el) => el.properties.id == gov_id);
      var point = {
        type: "Feature",
        geometry: {
          coordinates: [lon, lat],
          type: "Point",
        },
      };

      const resData = booleanWithin(point, polygon);

      return NextResponse.json(resData, { status: 200 });
    } else {
      return NextResponse.json("error in given parameters", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json("there is an error", { status: 500 });
  }
}