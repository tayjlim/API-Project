import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import DetailSpot from "./components/Spots/DetailSpot";
import CreateSpot from './components/Spots/CreateSpot.js'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {
        isLoaded &&
        <Switch>

          <Route exact path = '/'>
            <Spots/>
          </Route>


          <Route exact path = '/spots/new'>
            <CreateSpot/>
          </Route>

          <Route exact path = '/spots/:spotId'>
          <DetailSpot/>
          </Route>


        </Switch>
      }

    </>
  );
}

export default App;
