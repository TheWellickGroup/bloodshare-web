import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="main">
        {children}
        <style jsx global>
          {`
            body {
              font-family: 'Lusitana', serif !important;
            }
            main {
              min-height: 60vh;
              padding: 30px;
            }
          `}
        </style>
      </main>
      <Footer />
    </>
  );
}
