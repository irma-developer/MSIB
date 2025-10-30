import API from "../_api";

export const getGenres = async () => {
  const { data } = await API.get("/genres");
  return data?.data ?? data;
};

export const getGenre = async (id) => {
  const { data } = await API.get(`/genres/${id}`);
  return data?.data ?? data;
};

export const createGenre = async (payload) => {
  try {
    const { data } = await API.post("/genres", payload);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateGenre = async (id, payload) => {
  try {
    const { data } = await API.put(`/genres/${id}`, payload, {
      headers: { Accept: "application/json" },
    });
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteGenre = async (id) => {
  try {
    const { data } = await API.delete(`/genres/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
