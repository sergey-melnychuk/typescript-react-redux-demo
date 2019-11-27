import axios from 'axios'
import { Employee } from '../typings'

// TODO make configurable
const API_URL = 'http://localhost:3000'
// TODO query string formatter

// GET /employees
const getAll = () => {
    return axios.get<Employee[]>(`${API_URL}/employees`)
        .then(response => response.data)
}

// GET /employees?_page=1&limit=10
const getPage = (page: number, limit: number) => {
    return axios.get<Employee[]>(`${API_URL}/employees?_page=${page}&_limit=${limit}`)
        .then(response => response.data)
}

// GET /employees/:id
const getOne = (id: Employee['id']) => {
    return axios.get<Employee>(`${API_URL}/employees/${id}`)
        .then(response => response.data)
}

// DELETE /employees/:id
const deleteOne = (id: Employee['id']) => {
    return axios.delete<void>(`${API_URL}/employees/${id}`)
        .then(response => response.data)
}

export default {
    getAll,
    getPage,
    getOne,
    deleteOne
}
