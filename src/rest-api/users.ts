import axios from 'axios'

type Response = {
    info: {},
    results: User[]
}

export type User = {
    name: {
        title: string,
        first: string,
        last: string
    },
    location: {
        city: string,
        country: string
    }
    email: string,
    login: {
        uuid: string,
    }
    picture: {
        thumbnail: string
    }
}

const API_URL = "https://randomuser.me/api/?results="

export const get = async (count: number) => {
    const r = await axios.get<Response>(`${API_URL}${count}`)
    console.log(r.data)
    return r.data.results
}
