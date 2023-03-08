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

export const getDeals = async ({ host, count, page }) => {
  const response = await fetch(`https://${host}/open/stats/deals?page=${page}&page_size=${count}`);
  const json = await response.json();
  return json.content_deals;
};

export const getInfo = async ({ host }) => {
  const response = await fetch(`https://${host}/open/stats/totals/info`);
  const json = await response.json();
  return json;
};
