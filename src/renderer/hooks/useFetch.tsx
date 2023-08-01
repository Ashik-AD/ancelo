import fetcher from "lib/fetch";
import { useEffect, useState } from "react";

export default function useFetch(url: string, option?: RequestInit){
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true);

    (async function(){
      let res = await fetcher(url, option);
      if(res.error){
        setError(res.error);
      }
      else {
        setData(res);
      }
      setLoading(false)
    })();

  }, [url, option]);

  return {data, isLoading: loading, error: error} as const;

}
