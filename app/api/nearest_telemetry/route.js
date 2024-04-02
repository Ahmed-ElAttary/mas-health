import { NextResponse } from "next/server";

import Db from "../utils/prisma";

export async function POST(req, res) {

    BigInt.prototype.toJSON = function() {
        return this.toString()
    }
    try {
        const body = await req.json();
        const { gov_id, lon, lat } = body;
        const prisma = new Db();
        const telemetry = await prisma.$queryRaw `
DECLARE @given_point geography;
SET @given_point = geography::Point(${lat}, ${lon}, 4326);
SELECT TOP 2
*,
ROUND(@given_point.STDistance(geography::Point(latitude, longitude, 4326))/1000,2) AS distance
FROM telemetry
WHERE governorate_id=${gov_id}
ORDER BY
@given_point.STDistance(geography::Point(latitude, longitude, 4326));
`;


        return NextResponse.json(telemetry, { status: 200 });
    } catch (err) {
   
        return NextResponse.json("there is an error", { status: 500 });
    }
}