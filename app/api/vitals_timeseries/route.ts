import { ObjectId } from "mongodb";
import { getDocumentByQueryId, insertDocument } from "../functions";

export async function POST(req: Request) {
  const body = await req.json();
  const paams = {
    ...body,
    createdAt: new Date(),
    userId: new ObjectId(body.userId),
  };
  try {
    const result = await insertDocument("vitals_timeseries", paams);
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (e) {
    console.log("error in user timely vitals update api", e);
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
      "vitals_timeseries",
      "userId",
      userId as string
    );
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    console.log("error in user timely vitals get api", e);
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
