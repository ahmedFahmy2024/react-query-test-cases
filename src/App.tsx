// App.tsx

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import InfinitePostsPage from "./pages/InfinitePostsPage";
import Navigation from "./components/Navigation";
import "./App.css";
import SelectPage from "./pages/SelectPage";
import QueriesPage from "./pages/QueriesPage";
import PaginationPage from "./pages/PaginationPage";
import OptimisticUpdatesPage from "./pages/OptimisticUpdatesPage";
import InfinitePostsObserverPage from "./pages/InfinitePostsObserverPage";

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/infinite-posts" element={<InfinitePostsPage />} />
          <Route
            path="/infinite-posts-2"
            element={<InfinitePostsObserverPage />}
          />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/queries" element={<QueriesPage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route
            path="/optimistic-updates"
            element={<OptimisticUpdatesPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
