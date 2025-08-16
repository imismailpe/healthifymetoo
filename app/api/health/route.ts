import { getDocumentByQueryId, upsertDocument } from "../functions";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, ...data } = body;
  try {
    const result = await upsertDocument("health", userId, data);
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (e) {
    console.log("error in user health update api", e);
    return new Response(
      JSON.stringify({
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const result = await getDocumentByQueryId(
      "health",
      "userId",
      userId as string
    );
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    console.log("error in user health get api", e);
    return new Response(
      JSON.stringify({
        success: false,
        data: [],
      }),
      {
        status: 500,
      }
    );
  }
}
