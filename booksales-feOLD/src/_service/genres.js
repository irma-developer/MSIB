import API from "../_api";

export const getGenres = async () => {
  const { data } = await API.get("/genres");
  return data.data
};

export const createBooks = async (data) => {
  try {
    const response = await API.post("/genres", data);
    return response.data;
  } catch (error) {
    console.error("Error creating genre:", error);
    throw error;
  }
}