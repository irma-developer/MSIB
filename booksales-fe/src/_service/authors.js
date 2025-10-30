import API from "../_api";

export const getAuthors = async () => {
  const { data } = await API.get("/authors");
  return data?.data ?? data;
};

export const getAuthor = async (id) => {
  const { data } = await API.get(`/authors/${id}`);
  return data?.data ?? data;
};

export const createAuthors = async (payload) => {
  try {
    const { data } = await API.post("/authors", payload, {
      headers: { Accept: "application/json" },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAuthor = async (id, payload) => {
  try {
    const { data } = await API.put(`/authors/${id}`, payload, {
      headers: { Accept: "application/json" },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    const { data } = await API.delete(`/authors/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
