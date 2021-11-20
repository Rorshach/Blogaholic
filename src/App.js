import Navbar from './Navbar'; 
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import { onSnapshot, collection } from '@firebase/firestore';
import { useEffect } from 'react';
import db from "./fb";

function App() {
  useEffect(() => {
    onSnapshot(collection(db, "blogs"), (snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
    });
});
 
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
