import { ApiClient } from "../api/apiClient";

export const getListOfAllPokemons = () => {
  return ApiClient.get("/pokemons/").then(({ data }) => data);
};

export const updatePokemon = async (pokemon) => {
  ApiClient.put(`/posts/pokemons/`, pokemon).then(({ data }) => data);
};

export const signUp = async (username, password) => {
    ApiClient.post(`/users/`, {username, password}).then(({ data }) => data);
};

export const LogIn = async (username, password) => {
    ApiClient.get(`/users/`, {username, password}).then(({ data }) => data);
};
