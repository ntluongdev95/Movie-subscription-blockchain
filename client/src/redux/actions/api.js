import axios from 'axios'

const headers = (token) => ({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  export const getSubById =(id,token)=>axios.get(`/api/plan/${id}`,headers(token))
  export const getUserDetail =(token)=>axios.get('/api/user',headers(token))
  export const createSub =(form,token)=>axios.put('/api/plan/subscription',form,headers(token))
  export const deleteSub =(planId,token)=>axios.put('/api/plan/subscription/delete',planId,headers(token))