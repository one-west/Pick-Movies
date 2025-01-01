import {useEffect, useState} from "react";
import axios from "axios";

function Home() {

  const [hello, setHello] = useState("")

  useEffect(() => {
    axios.get("/api/hello")
    .then(response => setHello(response.data))
    .catch(error => console.log(error))
  }, []);

  return <h1>Home Page: {hello}</h1>;
}

export default Home;
