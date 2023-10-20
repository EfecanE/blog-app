import { Routes, Route } from "react-router-dom";
import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";
import AddBlog from "./routes/add-blog/add-blog.component";
import EditBlog from "./routes/edit-blog/edit-blog.component";
import BlogDetail from "./routes/blog-detail/blog-detail.component";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/blog/add" element={<AddBlog />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
