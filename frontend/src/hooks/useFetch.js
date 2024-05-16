import { useState, useEffect } from 'react';


const url = "http://localhost:4000"

const useFetch = (endPoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");




    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${url}${endPoint}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };

        fetchData();
    }, [url]);




    return { data, loading, error,  };
};

export default useFetch;
