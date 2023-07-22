const url = "http://localhost:6699";

export default async function fetcher(
  path: string,
  option?: RequestInit,
): Promise<any | { error: string }> {
  const reqOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...option,
  };
  const req = await fetch(`${url}${path}`, { ...reqOptions });

  const data = await req.json();

  if (!req.ok) {
    return {
      error: data.error || "something went wrong",
    };
  }
  return data;
}
