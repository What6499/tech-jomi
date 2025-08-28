import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import { ObjectId } from "mongodb";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
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
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
