import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    // 1. Extract credentials sent by your login page form
    const { username, password } = await request.json();

    // 2. Validate input fields are not completely empty
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // 3. Proxy Step: Forward authentication requests directly to DummyJSON
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // Session duration token constraint
      }),
    });

    // 4. Handle Rejected Credentials (Unauthorized logins)
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Invalid credentials" },
        { status: response.status }
      );
    }

    // Unpack successful JSON response object payload from DummyJSON
    const data = await response.json();

    // 5. Mock Role Assignment: Allocate permissions conditionally based on user profiles
    let role = "user";
    if (data.username === "emilys") {
      role = "admin";
    } else if (data.username === "michaelw") {
      role = "editor";
    } else {
      role = "user";
    }

    // Build the user metadata package structural footprint
    const authUser = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
      role,
    };

    // Combine user profiles with external bearer tokens
    const sessionData = {
      user: authUser,
      token: data.accessToken,
    };

    // 6. Append Secure HTTP-Only Browser State Cookie Store tracking data
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30, // Automatically destroys itself after 30 minutes
    });

    // Return the user data schema back to the frontend login framework
    return NextResponse.json(authUser);

  } catch (error) {
    console.error("Login Proxy Error:", error);
    return NextResponse.json(
      { error: "An unexpected authentication error occurred" },
      { status: 500 }
    );
  }
}