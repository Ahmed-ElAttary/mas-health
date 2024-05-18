import booleanWithin from "@turf/boolean-within";
import * as govs from "@public/simplified.json";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const body = await req.json();
    const { lon, lat } = body;
    if (lon && lat) {
      var point = {
        type: "Feature",
        geometry: {
          coordinates: [lon, lat],
          type: "Point",
        },
      };

      const govID = govs.features.find((gov) => booleanWithin(point, gov))
        ?.properties?.id;

      return NextResponse.json({ govID }, { status: 200 });
    } else {
      return NextResponse.json("error in given parameters", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(`there is an error ${err}`, { status: 500 });
  }
}
