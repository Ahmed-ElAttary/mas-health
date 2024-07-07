import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req) {
  try {
    const url = new URL(req.url);

    const imageBuffer = await captureCesiumMap(`${url.origin}/report`);
    const headers = new Headers();
    headers.set("Content-Type", "image/png");
    return new NextResponse(imageBuffer, { status: 200, headers });
  } catch (err) {
    console.log(err);
    return NextResponse.json(`there is an error getting the image `, {
      status: 500,
    });
  }
}

async function captureCesiumMap(url) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  try {
    // Replace 'your_cesium_page_url' with the actual URL of the Cesium map
    await page.goto(url);
    await page.waitForNetworkIdle();
    const doc = await page.evaluate(() => {
      window.viewerCs?.viewer?.render();
      return window.viewerCs?.viewer?.canvas
        ?.toDataURL("image/png")
        .split(",")[1];
    });
    //   console.log(doc);
    // const imageBuffer = await page.screenshot({ fullPage: true });
    //   console.log(imageBuffer);
    await browser.close();

    //   console.log(Buffer.from(doc, "base64"));
    return Buffer.from(doc, "base64");
    // return imageBuffer;
  } catch (error) {
    await browser.close();
    // console.error(error);
    throw error;
  }
}
