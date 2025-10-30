// _service/books.js
import API from "../_api";

export const getBooks = async () => {
  const { data } = await API.get("/books");
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.data)) return data.data.data;
  return [];
};

// ✅ GET detail book (normalisasi)
export const getBook = async (id) => {
  const { data } = await API.get(`/books/${id}`);
  // backend kamu biasanya { success, message, data }
  return data?.data ?? data;
};

// (opsional) tetap export showBooks untuk backward-compat
export const showBooks = getBook;

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

export const updateBooks = async (id, payload) => {
  try {
    const isFormData =
      typeof FormData !== "undefined" && payload instanceof FormData;
    if (isFormData && !payload.has("_method")) {
      payload.append("_method", "PUT");
    }
    const headers = isFormData ? { "Content-Type": "multipart/form-data" } : {};
    const { data } = await API.post(`/books/${id}`, payload, { headers });
    return data;
  } catch (error) {
    console.log("updateBooks error:", error?.response?.data || error.message);
    throw error;
  }
};

export const deleteBooks = async (id) => {
  try {
    const response = await API.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ✅ Helper untuk url file (cover)
export const fileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // kalau backend simpan "books/xxx.jpg" di disk 'public'
  const base = API?.defaults?.baseURL?.replace(/\/+$/, "") || "";
  return `${base}/storage/${path.replace(/^\/+/, "")}`;
};
