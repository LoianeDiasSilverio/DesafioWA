import axios from "axios";
import {GET_USERS} from './endpoints'

export default class UsersService {
    async getUsersRequest(){
        return new Promise(async (resolve, reject) => {
            const url = GET_USERS();
            try{
                const response = await axios.get(url);
                resolve(response);
            } catch(error){
                reject(new Error('Ocorreu um erro ao recuperar usuarios'))
            }
        })
    }
}