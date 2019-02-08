import axios from 'axios';
import { resolve } from 'q';


class FeedService {
    //Get feed static sigfnica q posso chamar o método sem instanciar a classe
    static getFeed(token,link){
    return new Promise(async(resolve,reject) =>{

        try{
            const defaultOptions = {
                headers: {
                    Authorization: token
                },
            };
            const res = await axios.get(link,{defaultOptions});
            const data= res.data;
            resolve(
                data.map(post => ({
                     ...post,
                    
                }))
            );

        } catch(e){
            reject();
        }
    })
    }
    
    static getPeople(token,nome){
        return new Promise(async(resolve,reject) =>{
            try{
            const defaultOptions = {
                headers: {
                    Authorization: token
                },
            };
            const res = await axios.get('http://localhost:3000/api/perfil/nome/'+nome,{defaultOptions});
            const data= res.data;
            resolve(
                data.map(post => ({
                     ...post,
                    
                }))
            );

        } catch(e){
            reject(e);
        }
    })
    }

    static getProfile(token,nome){
        return new Promise(async(resolve,reject) =>{
        try{
            const defaultOptions = {
                headers: {
                    Authorization: token
                },
            };
            const res = await axios.get('http://localhost:3000/api/perfil/'+nome,{defaultOptions});
            const data= res.data;
            resolve(
                data
            );

        } catch(e){
            reject(e);
        }
    })
    }

    static getTotalInfo(token,id){
        return new Promise(async(resolve,reject) =>{
            try{
                const defaultOptions = {
                    headers: {
                        Authorization: token
                    },
                };
                const res = await axios.get('http://localhost:3000/api/perfil/infoTotal/'+id,{defaultOptions});
                const data= res.data;
                resolve(
                    data
                );
    
            } catch(e){
                reject(e);
            }
        })
    }

    static trataAmizade(token,body,url){
        return new Promise(async(resolve,reject) =>{
            try{
                const defaultOptions = {
                    headers: {
                        Authorization: token
                    },
                };
                const res = await axios.post(url,body,{defaultOptions});
                const data= res.data;
                resolve(
                    data
                );
    
            } catch(e){
                reject(e);
            }
        })
    }
}
export default FeedService; 