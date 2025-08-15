import { getDocumentById, updateDocument } from "../functions";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, ...data } = body;
  try {
    const result = await updateDocument("users", id, data);
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (e) {
    console.log("error in user update api", e);
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
  const id = searchParams.get("id");

  try {
    const result = await getDocumentById("users", id as string);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    console.log("error in user get api", e);
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
