import { IdeasProvider } from "./lib/context/ideas";
import { UserProvider, useUser } from "./lib/context/user";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import SpaceBackground from "./SpaceBackground";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div>
      <SpaceBackground />
      <UserProvider>
        <IdeasProvider>
          <Navbar /> {/* Add the navbar before page content */}
          <main>{isLoginPage ? <Login /> : <Home />}</main>
        </IdeasProvider>
      </UserProvider>
    </div>
  );
}

function Navbar() {
  const user = useUser();

  return (
    <nav>
      <a href="/">Idea tracker</a>
      <div>
        {user.current ? (
          <>
            <span>{user.current.email}</span>
            <button type="button" onClick={() => user.logout()}>
              Logout
            </button>
          </>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </nav>
  );
}

export default App;
