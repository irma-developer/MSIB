import API from "../_api";

export const getBooks = async () => {
  const { data } = await API.get("/books");
  // normalisasi berbagai bentuk payload
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.data)) return data.data.data;
  return [];
};

export const createBooks = async (formData) => {
  try {
    const res = await API.post("/books", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.log("createBooks error:", error?.response?.data || error.message);
    throw error;
  }
};
