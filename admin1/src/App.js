import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/Aurhcontext/Authcontext";
import ListList from "./pages/Lists/ListList";
import Lists from "./pages/list/Lists";
import Newlist from "./pages/newlist/newlist";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>{" "}
        {user ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />

              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/list">
                <ListList />
              </Route>
              <Route path="/list/:listId">
                <Lists />
              </Route>
              <Route path="/newlist">
                <Newlist />
              </Route>
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
        <Topbar />
      </Switch>
    </Router>
  );
}

export default App;
