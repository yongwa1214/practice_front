
import axios  from "axios";
axios.defaults.baseURL = "http://localhost:8080/link"

class HttpService{

  constructor(){
    console.log("HttpService 객체 생성")
  }

  async save(item){
    const res = await axios.post("/memo", item)
    return res.data;
  }

  async findAll(params){
    const res = await axios.get("/memo", {params})
    return res.data;
  }

  async findOne(id){
    const res = await axios.get(`/memo/${id}`)
    return res.data;
  }

  async modify(item){
    const res = await axios.put("/memo", item)
    return res.data;
  }

  async deleteMemo(params){
    const res = await axios.delete("/memo", {params})
    return res.data;
  }
}

export default new HttpService();