import authApi  from "../AxiosConfig";

const userData= async (userId)=>{
    try{
        const  response= await authApi.get(`/user/${userId}`)
        console.log('userId',response)
        return response;
    }
    catch(error){
        console.error('Error:', error);
        throw error;
    }
}

export  {userData} ;