import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Table from "./Table";

const Layout: React.FC = () => (
  <div className="flex flex-col h-screen">
    <Header />
    <main className="h-[calc(100vh-90px)]">
      <Table />
    </main>
    <Footer />
  </div>
);

export default Layout;
