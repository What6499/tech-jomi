import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import { ObjectId, WithId, Document } from "mongodb";

// Define the params interface for the dynamic route
interface Params {
  params: { id: string };
}

// Define the GET handler with explicit return type
export async function GET(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse<WithId<Document> | { error: string }>> {
  try {
    // Validate ObjectId
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const { db } = await connectToDB();
    const product = await db
      .collection("productsCollection")
      .findOne({ _id: new ObjectId(params.id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
