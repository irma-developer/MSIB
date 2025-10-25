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


export const showBooks = async (id, formData) => {
  try {
    const { data } = await API.get(`/books/${id}`, formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }

}

export const updateBooks = async (id, data) => {
  try {
    const response = await API.post(`/books/${id}`, data, )
    return response.data;
  } catch (error) {
    console.log( error);
    throw error;
  }
};

export const deleteBooks = async (id) => {
  try {
    const response = await API.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.log( error);
    throw error;
  }
};
