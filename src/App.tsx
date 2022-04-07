import React from 'react';
import './App.css';
import { Routes,Route } from 'react-router';
import PopularContainer from './Components/Popular/PopularContainer';
import NewContainer from './Components/New/NewContainer';
import Login from './Components/Account/Auth/Login';
import Registration from './Components/Account/Registration/Registration';
import HeaderContainer from './Components/Header/HeaderContainer';
import AddImgContainer from './Components/AddImg/addImgContainer';
import { QueryClient,QueryClientProvider } from 'react-query';

const queryclient = new QueryClient();
const App = () =>{
  return (
      <div className='App'>
         <HeaderContainer/>
            <QueryClientProvider client={queryclient}>
            <div className="content">
              <Routes>
                 <Route path = "/"  element={<Login/>}/>
                 <Route path = "/Registration"  element={<Registration/>}/>
                 <Route path="/New"  element={<NewContainer/>}/>  
                 <Route path="/AddImg"  element={<AddImgContainer/>}/> 
                  <Route path='/Popular' element={<PopularContainer/>}/>
              </Routes>
            </div>
          </QueryClientProvider>
      </div>
  );
}

export default App;
