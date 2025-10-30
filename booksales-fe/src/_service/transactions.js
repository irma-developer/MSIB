// src/_service/transactions.js
import API from "../_api";

export const listTransactions = async () => {
  const { data } = await API.get("/transactions");
  return data?.data || [];
};

export const showTransaction = async (id) => {
  const { data } = await API.get(`/transactions/${id}`);
  return data?.data;
};

export const createTransaction = async ({ book_id, quantity }) => {
  const { data } = await API.post("/transactions", { book_id, quantity });
  return data;
};

export const updateTransaction = async (id, { quantity }) => {
  const { data } = await API.put(`/transactions/${id}`, { quantity });
  return data;
};

export const deleteTransaction = async (id) => {
  const { data } = await API.delete(`/transactions/${id}`);
  return data;
};
