import axios from "axios";

const API_URL = "https://eyeageb.algoapp.in/api/eye";

const tokenConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const getMyEntries = async () => {
  const res = await axios.get(`${API_URL}/my-entries`, tokenConfig());
  console.log("GET /my-entries", res.data);
  return res.data;
};

const getSharedEntries = async () => {
  const res = await axios.get(`${API_URL}/shared-with-me`, tokenConfig());
  return res.data;
};

const createEntry = async (entryData) => {
  const res = await axios.post(API_URL, entryData, tokenConfig());
  return res.data;
};

const shareEntry = async (entryId, emails) => {
  const res = await axios.post(
    `${API_URL}/share/${entryId}`,
    { emails },
    tokenConfig()
  );
  return res.data;
};

export default { getMyEntries, getSharedEntries, createEntry, shareEntry };
