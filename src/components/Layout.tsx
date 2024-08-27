import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Table from "./Table";

const Layout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <Table />
    <Footer />
  </div>
);

export default Layout;
