import axios from 'axios';



interface UserData {
  name: string;
  email: string;
  password: string;
}

export async function PostUser({ name, email, password }: UserData) {
  try {
    const response = await axios.post("/api/sign-up", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Signup failed");
  }
}


 