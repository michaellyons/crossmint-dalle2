const fetch = require("node-fetch");

const prepareHeaders = (token) => {
  const reqHeader = new Headers();
  reqHeader.append("Authorization", `Bearer ${token}`);
  return reqHeader
};

export default async function handler(req, res) {
  const requestOptions = {
    method: 'GET',
    headers: prepareHeaders(req.query.k),
  };
  let mint_result;
  await fetch('https://labs.openai.com/api/labs/tasks?limit=50', requestOptions)
    .then(response => response.json())
    .then(result => mint_result = result)
    .catch(error => console.log('error', error));
  res.status(200).json({ result: mint_result })
}
