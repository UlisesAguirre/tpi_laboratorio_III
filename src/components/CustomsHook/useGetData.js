import { useEffect, useState } from "react";
import { db } from "../../firebase";

const useGetData = (collection) => {
    
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await db.collection(collection).onSnapshot((querySnapshot) => {
            const arrayData = [];
            querySnapshot.forEach((doc) => {
              arrayData.push({ ...doc.data(), id: doc.id });
            });
            setData(arrayData);
          });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [collection]);

  return { data, loading, error };
};

export default useGetData;
