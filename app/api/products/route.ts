import { connectToDB } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDB();

    // Access the 'limit' query parameter from the request URL
    const limitParam = req.nextUrl.searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : 0;

    let query = db.collection("productsCollection").find({});

    if (limit > 0) {
      query = query.limit(limit);
    }

    const products = await query.toArray();

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
