import styled from "styled-components";
import { IoExitOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext";
import { Link, useHistory } from "react-router-dom";
import Records from "./Records";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";
import axios from "axios";

export default function Transactions() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [records, setRecords] = useState(null);

  useEffect(() => {
    const headers = { headers: { Authorization: `Bearer ${user.token}` } };
    const promise = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`,
      headers
    );
    promise.then((answer) => {
      setRecords(answer.data);
    });
    promise.catch(() => {
      alert(
        "houve um erro ao buscar seus registros, tente entrar novamente na pagina"
      );
    });
  }, [user.token]);

  function signOut() {
    const headers = { headers: { Authorization: `Bearer ${user.token}` } };
    const promise = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/sign-out`,
      {},
      headers
    );
    promise.then(() => {
      localStorage.removeItem("user");
      history.push("/");
    });
    promise.catch(() => alert("Houve um erro ao tentar sair"));
  }

  return (
    <Body>
      <Header>
        <h1>Ola, {user?.name}</h1>
        <IoExitOutline onClick={signOut} />
      </Header>
      <Records records={records} />
      <Buttons>
        <Link to="/new-entry">
          <OutlinePlus />
          <span>Nova entrada</span>
        </Link>
        <Link to="/new-expense">
          <OutlineMinus />
          <span>Nova saida</span>
        </Link>
      </Buttons>
    </Body>
  );
}

const Body = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 25px;
`;
const Header = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 26px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  a {
    width: calc(50% - 7.5px);
    height: 17vh;
    background: #a328d6;
    border-radius: 5px;
    border: none;
    color: #fff;
    position: relative;
    font-weight: 700;
    span {
      position: absolute;
      bottom: 10px;
      left: 10px;
      width: 50%;
      font-size: 17px;
      line-height: 20px;
      text-align: start;
    }
  }
`;
const OutlinePlus = styled(HiOutlinePlusCircle)`
  position: absolute;
  top: 10px;
  left: 10px;
`;
const OutlineMinus = styled(HiOutlineMinusCircle)`
  position: absolute;
  top: 10px;
  left: 10px;
`;
