import './App.css';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Auth from './hoc/auth';
import Register from './components/Register';
import Upload from './components/Upload/Upload';
import PostDetails from './components/Post/PostDetails';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Auth(Home, false)} />
          <Route path='/login' component={Auth(Login, false)} />
          <Route path='/register' component={Auth(Register, false)} />
          <Route path='/upload' component={Auth(Upload, true)} />
          <Route path='/hosting/:postId' component={Auth(PostDetails, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
