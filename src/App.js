import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import NotFoundPage from './Component/NotFoundPage/NotFoundPage';
import RidePage from './Component/RidePage/RidePage';
import { createContext, useState } from 'react';
import PrivateRoute from './Component/PrivateRoute/PrivateRout';

export const userContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
   <div className="home">

    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>

     
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
        <Home></Home>
        </Route>

        <Route path="/home">
        <Home></Home>
        </Route>

        <Route path="/login">
          <Login></Login>
        </Route>

        <PrivateRoute path="/ridepage:id">
          <RidePage></RidePage>
        </PrivateRoute>

        <Route path="*">
          <NotFoundPage></NotFoundPage>
        </Route>

      </Switch>
    </Router>


    </userContext.Provider>


   </div>
   
  );
}

export default App;
