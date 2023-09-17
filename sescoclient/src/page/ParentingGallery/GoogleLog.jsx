import React from 'react'
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

const GoogleLog = () => {
  const clientId = '620860754662-apr8p8bcdhhs98e8ug6iugr30rsv4l3d.apps.googleusercontent.com'

  return (
    <>
         <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    useOneTap = {false}
                    isSignedIn={false}
                    onSuccess={(res) => {
                        console.log("성공")
                        console.log(res);
                    }}
                    onFailure={(err) => {
                        console.log("실패")
                        console.log(err);
                    }}
                />
          </GoogleOAuthProvider>
  </>
  )
}

export default GoogleLog