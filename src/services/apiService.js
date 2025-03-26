import axios from "axios";
import API_URL from "../config/api";

const api = axios.create({
  baseURL: API_URL,
});

//metódos CRUD BOARD
export const createBoard = async (boardData) => {
  const response = await api.post("/createBoard", boardData);
  return response.data;
};

export const listBoard = async () => {
  const response = await api.get("/listBoard");
  return response.data;
};

export const editBoard = async (boardId, boardData) => {
  const response = await api.put(`/editBoard/${boardId}`, boardData);
  return response.data;
};

export const deleteBoard = async (boardId) => {
  const response = await api.delete(`/deleteBoard/${boardId}`);
  return response.data;
};

//métodos CRUD CARD

export const createCard = async (listData) => {
  const response = await api.post("/createCard", listData);
  return response.data;
};

export const listCard = async (listId) => {
  const response = await api.get(`/lists/${listId}/cards`);
  return response.data;
};

export const editCard = async (listId, listData) => {
  const response = await api.put(`/cards/${listId}/cards`, listData);
  return response.data;
};

export const deleteCard = async (listId) => {
  const response = await api.delete(`/cards/${listId}`);
  return response.data;
};

//métodos CRUD COLUMN

export const createColumns = async (columnData) => {
  const response = await api.post("/createColumns", columnData);
  return response.data;
};

export const listColumns = async (boardId) => {
  const response = await api.get(`/boards/${boardId}/lists`);
  return response.data;
};

export const editColumn = async (columnId, columnData) => {
  const response = await api.put(`/editColumns/${columnId}`, columnData);
  return response.data;
};

export const deleteColumn = async (id) => {
  const response = await api.delete(`/deleteColumns/${id}`);
  return response.data;
};
