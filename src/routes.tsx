import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Task from './pages/Task'
import TaskForm from './pages/TaskForm'
import Detail from './pages/Detail'
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Session from './pages/Session';
import TaskRedux from './pages/TaskRedux';
import TaskFormRedux from './pages/TaskFormRedux';

const routes = () => {

  const checkLogin = () => {
    if(localStorage.getItem("LoginStatus")) {
      return (
        <Routes>
          <Route path='/' element= { <Home /> }/>
          <Route path='/task' element={ <Task /> }/>
          <Route path='/task/add' element={ <TaskForm />} />
          <Route path='/task/edit/:id' element={ <TaskForm />} />
          <Route path='/task/:id' element={ <Detail />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/session' element={ <Session />} />
          <Route path='/redux' element={ <TaskRedux />} />
          <Route path='/redux/add' element={ <TaskFormRedux />} />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      )
    } else {
      return (
        <Routes>
          <Route path='/' element= { <Home /> }/>
          <Route path='/login' element={ <Login />} />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      )
    }
  }

  return (
    checkLogin()
  );
};

export default routes;
