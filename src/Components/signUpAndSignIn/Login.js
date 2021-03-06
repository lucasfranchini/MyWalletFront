import { Body, Title } from "./SignStyle";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext";
import axios from "axios";
export default function Login() {
  const { setUser } = useContext(UserContext);
  const user = localStorage.getItem("user");
  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.push("/transactions");
    } else {
      setUser(null);
    }
  }, [history, user, setUser]);

  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const [load, setLoad] = useState(false);

  function login(e) {
    e.preventDefault();
    setLoad(true);
    const promise = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/sign-in`,
      body
    );
    promise.then((answer) => {
      setUser(answer.data);
      localStorage.setItem("user", JSON.stringify(answer.data));
      history.push("/transactions");
    });
    promise.catch(() => {
      alert("Usuario ou senha incorreta, tente novamente");
      setLoad(false);
    });
  }

  return (
    <Body>
      <Title>MyWallet</Title>
      <form onSubmit={login}>
        <Input
          type="email"
          placeholder="E-mail"
          value={body.email}
          onChange={(e) => setBody({ ...body, email: e.target.value })}
          disabled={load}
        />
        <Input
          type="password"
          placeholder="senha"
          value={body.password}
          onChange={(e) => setBody({ ...body, password: e.target.value })}
          disabled={load}
        />
        <Button type="submit" disabled={load}>
          Entrar
        </Button>
      </form>
      <Link to="/Register">Primeira vez? Cadastre-se!</Link>
    </Body>
  );
}
