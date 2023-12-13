
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import PostDetail from './components/PostDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/post/:postId" Component={PostDetail} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
