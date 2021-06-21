import {BrowserRouter,Switch,Route} from "react-router-dom";
import GlobalStyle from "../styles/GlobalStyle";
import "../styles/reset.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle/>
        <Switch>
          <Route path="/" exact>
            <input placeholder="ola"></input>
          </Route>
          <Route path="/register" exact>

          </Route>
          <Route path="/transactions" exact>

          </Route>
          <Route path="/new-entry" exact>

          </Route>
          <Route path="/new-expense" exact>

          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;