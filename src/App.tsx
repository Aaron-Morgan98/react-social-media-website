import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Main} from "./pages/main/main";
import {Login} from "./pages/login";
import {Navbar} from "./components/navbar";
import {Footer} from "./components/footer";
import {Contact} from "./pages/contact"
import {CreatePost} from "./pages/create-post/create-post";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Footer />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/createpost" element={<CreatePost />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
      </Router>

    </div>
  );
};

export default App;
