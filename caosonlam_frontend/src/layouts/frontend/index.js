import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRoutes } from "react-router-dom";
import RouterFrontend from './../../router/RouterFrontend';
// import Banner from "./banner";


const LayoutFrontend = () => {
  return (
    <div>
      {/* <Banner /> */}
      <Header />
      <main>
        {useRoutes(RouterFrontend)}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutFrontend;
