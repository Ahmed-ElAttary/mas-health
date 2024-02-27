import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(req) {
  try {
    // const { token } = await req.json();
    const { search } = req.nextUrl;
    const { token } = await req.json();
    const { data } = await axios.get(
      `http://196.221.36.203:1145/api/location-handle${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}
