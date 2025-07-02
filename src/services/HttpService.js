import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService{

  constructor(){
    console.log('httpservice 객체 생성')
  }

  async save(jsonBody){ 
    const res = await axios.post('/memo', jsonBody);
    console.log('postItem:', res )
    return res.data;
  }

  async findAll(params){ 
    const res = await axios.get('/memo', {params});
    console.log('findAll', res)
    return res.data;
  }

  async findById(id){
    const res = await axios.get(`/memo/${id}`);
    console.log('findById', res)
    return res.data;
  }
}

export default new HttpService;