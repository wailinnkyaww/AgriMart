// import { BrowserRouter } from "react-router-dom";
// import { AppRoutes } from "./Navigation/Navigation";
// import Header from "./components/Header/Header";
// import Sidebar from "./components/Sidebar/Sidebar";
// import Footer from "./components/Footer/Footer";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="app-container">
//         <Header />

//         <div style={{ display: "flex" }}>
//           <Sidebar />
//           <main style={{ flex: 1, padding: "20px" }}>
//             <AppRoutes />
//           </main>
//         </div>

//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, useLocation } from "react-router-dom";

import { useState } from "react";

import { AppRoutes } from "./navigation/Navigation";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";

import { useAuth } from "./context/AuthContext";

function Layout() {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <Header
        toggleSidebar={() => {
          setSidebarOpen(!sidebarOpen);
        }}
      />
      <div
        className="page-wrapper"
        style={{
          display: "flex",
        }}
      >
        {user && sidebarOpen && (
          <Sidebar className={isHomePage ? "home-sidebar" : "sidebar"} />
        )}
        <main
          className="main-content"
          style={{
            flex: 1,
            maxWidth: "1520px",
            margin: "0 auto",
            marginTop: "65px",
          }}
        >
          <AppRoutes />
        </main>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
