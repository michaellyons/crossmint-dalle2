// == Checks the status of a mint against CrossMint API ==
async function checkStatus(mintingID){
  const reqHeader = new Headers();
  reqHeader.append("x-client-secret", process.env.CrossMintAPIKey);
  reqHeader.append("x-project-id", process.env.CrossMintProjectID);

  const requestOptions = {
    method: 'GET',
    headers: reqHeader,
    redirect: 'follow'
  };

  let check_result;
  await fetch(`${process.env.CROSSMINT_API}/${mintingID}/status`, requestOptions)
  .then(response => response.json())
  .then(result => check_result = result)
  .catch(error => console.log('error', error));
  return check_result;
}