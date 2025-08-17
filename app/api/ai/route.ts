import { getAdvice } from "@/app/mcps/advice";

export async function POST(req: Request) {
  const body = await req.json();
  const { input } = body;
  const aiResp = await getAdvice(JSON.stringify(input.health_params));
  return new Response(JSON.stringify(aiResp), {
    status: 200,
  });
}
