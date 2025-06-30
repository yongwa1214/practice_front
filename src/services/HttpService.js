

// axios는 객체를 보내면 쿼리스트링으로 만들어줌 
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api";


class HttpService {

  constructor() {
    console.log("HttpService 객체 생성");
  }

  async save(item) { //postMemo 였던것
    console.log("postMemo - item: ", item);
    // 주소에는 백엔드 주소를 넣어줘야함 postman에서 내가 /memo로 날렸잖아 
    const res = await axios.post("/memo", item)
    return res.data;
  }



  async getMemoList(params) {

  // get method 호출시, 2번째 인자는 객체를 보내고
  // 객체의 params 속성에 객체를 보내면
  // 자동으로 쿼리스트링 변환
    //console.log("getMemoList - params: ", params);
    const res = await axios.get("/memo", { params });
    
    //console.log("getMemoList - res.data: ", res.data);
    return res.data;
  }

  // async getMemoList(params) {
  // const res = axios.get("", { params });
  // 변수명과 키 값이 같으면 가능


  //수정하기 들어갔을 때 한 번
  async findById(id) { // getMemo 였던거
    console.log("getMemo - id: ", id);
    const res = await axios.get(`/memo/${id}`)
    return res.data;
  }

  async modify(item) { //putMemo 였던거
    console.log("putMemo - item: ", item);
    const res = await axios.put("/memo", item)
    return res.data;
  
  }
  async deleteMemo(params) {
    console.log("deleteMemo - params: ", params);
    const res = await axios.delete("/memo", { params });
    return res.data;
  }
}
export default new HttpService();