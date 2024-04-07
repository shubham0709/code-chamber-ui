import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Signup from "./pages/authentication/Signup";
import Signin from "./pages/authentication/Signin";
import AuthProvider from "./hoc/AuthProvider";
import SnippetEditor from "./components/snippet-editor/SnippetEditor";

function App() {
  return (
    <div className="min-h-screen bg-dark-1">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route
          path="/snippet/:id"
          element={
            <AuthProvider>
              <SnippetEditor />
            </AuthProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
