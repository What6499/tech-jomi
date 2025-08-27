import { connectToDB } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDB();
    const products = await db
      .collection("productsCollection")
      .find({})
      .toArray();
    console.log(products);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET /api/products error:", error); // <-- add this
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const { db } = await connectToDB();
    const data = await req.json();

    const result = await db.collection("productsCollection").insertOne(data);
    return NextResponse.json(
      { insertedId: result.insertedId },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
