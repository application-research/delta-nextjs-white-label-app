const REQUEST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getHeaders = (key) => {
  return { ...REQUEST_HEADERS, Authorization: `Bearer ${key}` };
};

export async function placeholder(key) {
  const response = await fetch('/api', {
    method: 'GET',
    headers: getHeaders(key),
  });

  const json = await response.json();
  return json;
}

export const getBalance = async ({ address, host }) => {
  const response = await fetch(`https://${host}/admin/wallet/balance/${address}`);
  const json = await response.json();
  return json.balance;
};

export const getAllDeals = async ({ host }) => {
  let response;
  let json;
  let solution = [];
  let page = 1;
  let pageSize = 10000;
  let finished = false;

  while (!finished) {
    response = await fetch(`https://${host}/open/stats/deals?page=${page}&page_size=${pageSize}`);
    json = await response.json();
    page = page + 1;
    solution = [...solution, ...json.content_deals];
    finished = json.content_deals.length !== pageSize;
  }

  return solution;
};

export const getInfo = async ({ host }) => {
  const response = await fetch(`https://${host}/open/stats/totals/info`);
  const json = await response.json();
  return json;
};
