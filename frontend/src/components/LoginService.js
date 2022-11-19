import axios from "axios"

let URL = "http://localhost:4001/api/user/login"

const login = async credentials => {
    const {data} = await axios.post(URL, credentials)
    return  data
}

export default {login}