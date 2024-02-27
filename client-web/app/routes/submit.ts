import { ActionFunctionArgs, json } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const url = `http://localhost:8000/submit`;
  const res = await fetch(url, { method: "POST" });
  return json({});
}
