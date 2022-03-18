import axios from 'axios';

export const URL = "http://localhost:3000/api"

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})