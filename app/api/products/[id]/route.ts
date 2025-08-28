import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDB();
    const { id } = params;

    const product = await db
      .collection("productsCollection")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
