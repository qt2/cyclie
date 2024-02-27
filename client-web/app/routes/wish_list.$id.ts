import { ActionFunctionArgs, json } from "@remix-run/node";

export async function action({ request, params }: ActionFunctionArgs) {
  const url = `http://server-recommend:8000/wish_list/${params.id}`;
  let res;

  switch (request.method) {
    case "POST":
      res = await fetch(url, { method: "POST" });
      return json({});

    case "DELETE":
      res = await fetch(url, { method: "DELETE" });
      return json({});

    default:
      throw new Response("Method Not Allowed", { status: 405 });
  }
}
