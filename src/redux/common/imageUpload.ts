import axios, { AxiosError } from "axios";

const imageUpload = async (file: File) => {
  try {
    const result = await axios.post("https://api.escuelajs.co/api/v1/files/upload",
      {file},
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return result.data.location;
  } catch (err) {
    const error = err as AxiosError;
    if (error.request) {
      console.log("Error in request: ", error.request);
    } else {
      console.log(error.response?.data);
    }
  }
};

export default imageUpload;