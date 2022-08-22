import dotenv from 'dotenv';
import fetch from "node-fetch"
import shortUrl from 'node-url-shortener'

import { prepareHeaders } from '../../lib/crossmint'
// secret sauce 
dotenv.config()

// == Mints an NFT with given parameters using CrossMint API ==
async function mint(body){
    const requestOptions = {
      method: 'POST',
      headers: prepareHeaders(),
      body: JSON.stringify(body),
      redirect: 'follow'
    };
    console.log(requestOptions, process.env.NEXT_PUBLIC_CROSSMINT_API)
    let mint_result;
    await fetch(process.env.NEXT_PUBLIC_CROSSMINT_API, requestOptions)
      .then(response => response.json())
      .then(result => mint_result = result)
      .catch(error => console.log('error', error));
    return mint_result;
}

const prepareRecipientString = (data) => {
  // handle email vs web3 wallet. 
  // should make a function to *cleanly* handle parsing this on both mint command and here - due to time issues this was not done.
  let recipient;
  if(data.nft_deliveryMethod == 'email'){
      recipient = data.nft_deliveryMethod+":"+data.nft_recipient+":"+data.nft_network;
  }
  else {
      recipient = data.nft_network+":"+data.nft_recipient
  }
  return recipient
}

const shortPromise = (url) => new Promise((accept, reject) => {
  shortUrl.short(url, (err, url) => err ? reject(err): accept(url))
})

const prepareRequestBody = (data) => ({
  "mainnet": false,
  "metadata": {
    "name": data.nft_name,
    "image": data.nft_image,
    "description": data.nft_description
  // would love to add optional traits here...
  },
  "recipient": prepareRecipientString(data)
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(200).json('Use Post')
    return
    // Process a POST request
  }
  const { imgUrl, recipientAddress, n, d } = req.body;

  const imgShort = await shortPromise(imgUrl);

  const metadata = prepareRequestBody({
    nft_name: n,
    nft_image: imgShort,
    nft_description: d,
    nft_recipient: 'momounicorn@proton.me',
    nft_deliveryMethod: 'email',
    nft_network: 'poly'
  })
  console.log("Attempting mint !" + imgUrl)
  console.log(metadata)
  // const mintResult = await mint(metadata)
  // console.log(mintResult)
  res.status(200).json({ result: metadata })
}