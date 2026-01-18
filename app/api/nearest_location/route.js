import { NextResponse } from "next/server";

import Db from "../utils/prisma";

export async function POST(req, res) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  try {
    const body = await req.json();
    const { location_type_id, lon, lat } = body;
    const prisma = new Db();
    // prettier-ignore
    const telemetry = await prisma.$queryRaw `
DECLARE @given_point geography;
SET @given_point = geography::Point(${lat},${lon}, 4326);

SELECT TOP 3
    l.*,
    ROUND(@given_point.STDistance(p.geom) / 1000, 2) AS distance
FROM dbo.Location l
CROSS APPLY (
    SELECT geography::Point(l.latitude, l.longitude, 4326) AS geom
) p
WHERE
location_type_id =${location_type_id}

 AND l.latitude IS NOT NULL
  AND l.longitude IS NOT NULL
ORDER BY @given_point.STDistance(p.geom);
`;

    return NextResponse.json(telemetry, { status: 200 });
  } catch (err) {
    return NextResponse.json("there is an error", { status: 500 });
  }
}
