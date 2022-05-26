import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import { AboutPage } from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import HomePage from './pages/HomePage';
import News from './pages/News';

function App() {
  return (
      <div className="App" style={{margin: "0 auto", maxWidth: "1000px"}}>
        <NavBar />
        <Routes>
          <Route path="/">
            <Route index element = {<HomePage/>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles-list" element={<ArticlesListPage />} />
            <Route path="/article">
              <Route index element = {<main style={{ padding: "1rem" }}> <p>No article selected</p> </main>}/>
              <Route path=":name" element={<ArticlePage/>}/>
            </Route>
          </Route>
          <Route path="*" element={<main style={{ padding: "1rem" }}> <h1>404</h1> <p>Page Not Found</p> </main>} />
      </Routes>
      </div>
  );
}

export default App;
