import axios from 'axios';

class HttpService{
  async postMemo(item){
    console.log(' postMemo -item :', item);
  }

  async getMemolist(params) { // 쿼리스트링
    console.log('getMemolist - parmas:'. params);

  }

  async getMemo(id){ //pathVariable
    console.log('getMemo - id:', id);
  }

  async putMemo(item){
    console.log('putMemo - item:', item);
  }

  async deleteMemo(params){ // 쿼리스트링
    console.log("deleteMemo - params:", params);
  }
}

export default new HttpService();