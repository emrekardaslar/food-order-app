import axios from "axios";

export async function getUsers() {
    return axios.get(process.env.REACT_APP_FIREBASE_USERS)
}