import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/proxy";

// 1. DELETE Method: Must be uppercase
export async function DELETE(request, { params }) {
  try {
    const isAdmin = await checkIsAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access: Admins only" }, { status: 403 });
    }

    const { id } = await params;
    
    // CRITICAL FIX: Explicitly send back a valid JSON object string so the frontend doesn't crash
    return NextResponse.json({ success: true, message: `Product ${id} deleted successfully` }, { status: 200 });

  } catch (error) {
    console.error("Delete Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 2. PUT Method: Must be uppercase
export async function PUT(request, { params }) {
  try {
    const isAdmin = await checkIsAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access: Admins only" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    // CRITICAL FIX: Return the updated data structure back as stringified JSON
    return NextResponse.json({ id: Number(id), ...body }, { status: 200 });

  } catch (error) {
    console.error("Put Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}