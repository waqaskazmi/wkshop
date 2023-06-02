import { useState, useEffect } from "react";
import http from "../services/httpService";

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const res = await http.get(url);
                setData(res.data);
            }
            catch(err){
                setError(true);
            }
            setLoading(false);
        };
        fetchData();
    },[url]);

    return {data, loading, error};
}

export default useFetch;

