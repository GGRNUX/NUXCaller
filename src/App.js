import Load from './components/Load'
import React, { Suspense, lazy } from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login';
import CallService from './components/CallService';


function App() {
  return (
    <React.Fragment>
      <Router>
      <Suspense fallback={<Load/>}>
        <Switch>
          <Route path="/" exact render ={ props=> ( <Login {...props} />)}></Route>
          <Route path="/callService" exact render ={ props=> ( <CallService {...props} />)}></Route>
        </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
}

export default App;
