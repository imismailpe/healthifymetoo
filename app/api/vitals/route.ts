import { getDocumentByQueryId, upsertDocumentByUserIdDate } from "../functions";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, date, ...data } = body;
  try {
    const result = await upsertDocumentByUserIdDate(
      "vitals",
      userId,
      date,
      data
    );
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (e) {
    console.log("error in user vitals update api", e);
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
      "vitals",
      "userId",
      userId as string
    );
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    console.log("error in user vitals get api", e);
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
