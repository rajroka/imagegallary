import axios from 'axios';

 async function PostUser({username , email  , password} : { username : string , email : string , password : string }) {
     const response = await axios.post("/api/sign-up", {  username , email  , password})
     return response.data 

}
export{PostUser}