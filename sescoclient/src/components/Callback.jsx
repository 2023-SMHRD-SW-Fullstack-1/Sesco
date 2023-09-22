// import React, { useEffect } from "react";

// import { useSearchParams } from "react-router-dom";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Callback = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const code = searchParams.get("code");
//   const navigate = useNavigate();

//   console.log("code :", code);
//   const clientId = "fa08f9dd3f1a65f4f4c681ca677d334c";

//   const loginHandler = () => {
//     window.location.href = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirectUri}&code=${code}"`;
//   };

//   return (
//     <div>
//       Callback
//       <button onClick={loginHandler}>로그인</button>
//       <button
//         onClick={() => {
//           navigate("/about");
//         }}
//       >
//         이동
//       </button>
//     </div>
//   );
// };

// export default Callback;
