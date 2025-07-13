export const apiHostname = "https://api.currencybeacon.com";

export const jsonFetcher: (input: RequestInfo, init?: RequestInit) => Promise<object> = async (
  input,
  init,
) => {
  if (typeof input !== "string") {
    throw new Error("not implemnted");
  }

  const newInput = `${apiHostname}${input}`;

  const newInit = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${import.meta.env.VITE_CURRENCYBEACON_API_KEY}`,
    },
  } satisfies RequestInit;

  return (await fetch(newInput, newInit)).json();
};
