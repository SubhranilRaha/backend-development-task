// import { HF_TOKEN } from './embedding-generator';
import axios from "axios";

export const HF_URL =
  process.env.HF_URL ||
  "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";
// export const HF_TOKEN = process.env.HF_TOKEN_1 || "";

export const generateEmbedding = async (text: string, token: string | undefined) => {
  try {
    const response = await axios.post(
      HF_URL,
      { inputs: text },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status !== 200) {
      throw new Error(
        `Request failed with status code ${response.status} : ${response.data}`
      );
    }
    return response.data;
  } catch (error) {
    // @ts-ignore
    console.error(error.response.data);
  }
};
