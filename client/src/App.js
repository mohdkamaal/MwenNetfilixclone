import "./App.scss";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Watch from "./pages/Watch/Watch";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { AuthContext } from "./Aurhcontext/Authcontext";
import { useContext } from "react";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/register" />}
          </Route>
          <Route path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/login">
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>
          {user ? (
            <>
              <Route path="/movies">
                <Home type="movies" />
              </Route>
              <Route path="/series">
                <Home type="series" />
              </Route>
              <Route path="/watch">
                <Watch />
              </Route>
            </>
          ) : (
            <Redirect to="/register" />
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
