import React from 'react'
import {
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import MintImage from './MintImage';


const HistoryView = ({ k, onClick }) => {
  const { isLoading, error, data: { result: { data } = {}} = {}, isFetching } = useQuery(["repoData"], () =>
    axios
      .get(`/api/dalle2jobs?k=${k}`)
      .then((res) => res.data),
      {
        refetchOnWindowFocus: false
      }
  );

  if (error) return "Error rendering history, make sure your access key is correct"

  if (isFetching || isLoading) return 'Loading History...'

  return (
    <div>
      {
       data && Array.isArray(data) &&  data.slice(0, 10).map(({ generations }) => {
        const { data } = generations;
        return <div>
        <div style={{display: 'flex'}}>
        {
          data.map((datum, idx) => <MintImage index={idx} onClick={onClick} imgSrc={datum?.generation?.image_path} />)
        }
        </div>
        </div>
       })
      }
      
    </div>
  )
}

export default HistoryView