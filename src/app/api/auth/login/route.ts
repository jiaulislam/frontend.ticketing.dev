import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const res = await fetch(`/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
            return NextResponse.json({ message: data.message || "Invalid credentials" }, { status: 401 });
        }
        // Set cookie if backend returns it (optional, depends on backend)
        // You may need to forward the Set-Cookie header here if using httpOnly cookies
        return NextResponse.json({ message: "Login successful" });
    } catch (e) {
        console.error("Login error:", e);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
