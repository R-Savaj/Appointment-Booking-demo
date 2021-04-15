import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import BookEvent from './components/book-event/book-event';
import ShowEvent from './components/show-event/show-event';

function App() {
  return (
    <Router>
     <div>
       <Route exact path="/" component={BookEvent}/>
       <Route path="/show-event" component={ShowEvent}/>
     </div>
   </Router>
  );
}

export default App;
