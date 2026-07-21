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
import { AppRoutes } from "./navigation/Navigation";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./pages/Public/Footer/Footer";
import { useAuth } from "./context/AuthContext";

function Layout() {
  const { user } = useAuth();
  const location = useLocation();

  // Hide sidebar on Home page
  const isHomePage = location.pathname === "/";

  // Show sidebar only when logged in and NOT on Home page
  const showSidebar = !!user && !isHomePage;

  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        {showSidebar && <Sidebar />}

        <main
          style={{
            flex: 1,
            maxWidth: "1520px",
            margin: "0 auto",
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
