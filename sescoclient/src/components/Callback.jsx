import React, { useEffect } from "react";
import { json, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("code :", code);

    axios
      .get(`http://localhost:8081/sesco/api/v1/home/kakaologin?code=${code}`)
      .then((res) => {
        console.log("통신성공?")
        console.log(res.json());
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      Callback
      <button
        onClick={() => {
          navigate("/about");
        }}
      >
        이동
      </button>
    </div>
  );
};

export default Callback;
