import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { Provider } from "react-redux";
import { store } from "./config/redux";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
