import axios from "axios";


export default axios.create({
    baseURL:'https://api.mailersend.com/v1/email',
    headers:{
        "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer mlsn.600b97a83debc04ab0069744f000a3bafd8222f0a99c62da3eaa561391fe7f18",
          
    }
})