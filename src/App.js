import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TemplateLuge from "./pages/TemplateLuge";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemplateLuge />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
