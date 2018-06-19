import axios from 'axios';

//axios.defaults.baseURL="/api";
axios.defaults.headers={
    "Content-Type":"application/json;charset=utf-8"
};
axios.defaults.withCredentials=true;
axios.interceptors.request.use(function(config){
},function(error){
});
axios.interceptors.response.use(function(response){
},function(error){
});

const $get = () => (
    axios.get()
)
const $add = () => (
    axios.post()
)
const $update = () => (
    axios.put()
)
const $delete = () => (
    axios.delete()
)
