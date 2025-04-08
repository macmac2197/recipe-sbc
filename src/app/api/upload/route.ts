/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: any) => {
  const formData = await req.formData();

  const imageFile = formData.get("image");

  if (!imageFile) {
    return NextResponse.json({ error: "No file received!" }, { status: 400 });
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const filename = Date.now() + imageFile.name.replaceAll(" ", "_");
  const filePath = `/images/${filename}`;
  try {
    await writeFile(
      path.join(process.cwd(), "public/images/" + filename),
      buffer
    );
    return NextResponse.json({
      message: "File successfully uploaded!",
      status: 201,
      filePath,
    });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
};
