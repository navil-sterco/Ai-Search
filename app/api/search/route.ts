import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://project-demo.in/gl-bajaj-demo/api/ai-search";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || !q.trim()) {
    return NextResponse.json(
      { status: false, error: "Missing query parameter 'q'." },
      { status: 400 }
    );
  }

  try {
    const upstreamUrl = `${UPSTREAM}?q=${encodeURIComponent(q)}`;
    const upstreamRes = await fetch(upstreamUrl, {
      // Always hit the origin fresh — these answers are meant to feel live.
      cache: "no-store",
    });

    if (!upstreamRes.ok) {
      return NextResponse.json(
        { status: false, error: `Upstream responded with ${upstreamRes.status}.` },
        { status: 502 }
      );
    }

    const data = await upstreamRes.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { status: false, error: "Could not reach the search service. Please try again." },
      { status: 502 }
    );
  }
}
