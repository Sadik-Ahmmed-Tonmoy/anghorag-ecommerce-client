import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Support = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`single-page/${id}`)
      .then((res) => {
        if (res.data.success === true) {
          setData(res.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id]);
  return (
    <div className="min-h-[calc(100vh-575px)] container mx-auto px-2 overflow-x-hidden">
      {data.details && (
        <div dangerouslySetInnerHTML={{ __html: data.details }} />
      )}
    </div>
  );
};

export default Support;
