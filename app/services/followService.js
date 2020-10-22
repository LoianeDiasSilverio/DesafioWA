import axios from "axios";

export default class FollowService {
    async getUserFollowerRequest(url){
        return new Promise(async (resolve, reject) => {
            try{
                const response = await axios.get(url);
                resolve(response);
            } catch(error){
                reject(new Error('Ocorreu um erro ao recuperar followers'))
            }
        })
    }
}