import { NextResponse } from "next/server";

import * as data from "@public/shapefile.json";
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const hasId = url.searchParams.has("id");
    let resData;
    if (hasId) {
      const id = url.searchParams.get("id");
      resData =
        data.features.find((el) => el.properties.id == id) ||
        "there is no such feature for given ID";
    } else {
      resData = data;
    }

    return NextResponse.json(resData, { status: 200 });
  } catch (err) {
     return NextResponse.json("there is an error", { status: 500 });
  }
}
