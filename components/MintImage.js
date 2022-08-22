import React from 'react'
import styles from "../styles/Home.module.css";


const prepareSubmissionData = ({ imgUrl, recipientAddress ='0x000000000000000', n = 'Your favorite NFT', d = 'Test NFT' }) => {
  return {
    imgUrl,
    recipientAddress,
    n,
    d
  }
}

export const MintImage = ({ imgSrc, prompt = 'This is an NFT Image', index = 0, onClick }) => {
  const [dataUrl, setDataUrl] = React.useState()

  const preppedMetadata = prepareSubmissionData({
    imgUrl: imgSrc,
    d: `${prompt} #${index}`
  })
  return (
    <div className={styles.card}>
      <img
        className={styles.imgPreview}
        style={{borderBottomLeftRadius: 0, marginBottom: 0, borderBottomRightRadius: 0}}
        src={imgSrc}
      />
      <button style={{width: '100%', borderTopRightRadius: 0, borderTopLeftRadius: 0, marginTop: -3}} onClick={async () => {
    return onClick({...preppedMetadata})
    }}>
        MINT THIS IMAGE
        {dataUrl}
      </button>
    </div>
  )
}

export default MintImage