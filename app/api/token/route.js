import { NextResponse } from "next/server";
import axios from "axios";
export async function GET() {
  try {
    const { data } = await axios.post("http://196.221.36.203:1145/api/token/", {
      username: "admin",
      password: "123",
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}
