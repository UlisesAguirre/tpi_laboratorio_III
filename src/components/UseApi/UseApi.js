import { useState, useEffect } from "react"

const UseApi = (url) => {

    const [data, setData] = useState([]);

    const fetchApi = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch {
        console.log("Error");
      }
    }


    useEffect(()=> {
        fetchApi()
    }, [])

  return (
    {data}
  )
}

export default UseApi