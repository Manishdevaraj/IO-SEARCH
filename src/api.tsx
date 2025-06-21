import axios from "axios";

const Searchurl ='https://n8n-x96d.onrender.com/webhook/iobot'
const ServerUrl ='https://io-search-engine.onrender.com'
const ServeraiUrl ='https://n8n-x96d.onrender.com/webhook/ai'


export const Search = async (q: string) => {
  try {
    const res = await axios.get(`${Searchurl}?q=${encodeURIComponent(q)}`);
    console.log(res); 
    // Check where hits exist
    const data = res.data;
    return data?.hits ?? data?.data ?? [];
  } catch (err) {
    console.error("Search API Error:", err);
    return [];
  }
};

export const getUrls = async () => {
  try {
    const res = await axios.get(`${ServerUrl}/urls/stats`);
    console.log(res);

    return res.data.sorted_queue
  } catch (err) {
    console.error("Search API Error:", err);
    return [];
  }
};
export const getai = async (q:string) => {
  try {
    const res = await axios.get(`${ServeraiUrl}?q=${q}`);
    console.log(res);

    return res.data.output
  } catch (err) {
    console.error("Search API Error:", err);
    return [];
  }
};