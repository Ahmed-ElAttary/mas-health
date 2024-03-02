// import { NextResponse } from "next/server";
// import axios from "axios";
// export async function POST(req) {
//   try {
//     const { token } = await req.json();

//     const { data } = await axios.get(
//       " http://196.221.36.203:1145/api/location-handle?start=1&length=100000000",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return NextResponse.json(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

