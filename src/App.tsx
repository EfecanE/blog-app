import { Routes, Route } from "react-router-dom";
import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";
import AddBlog from "./routes/add-blog/add-blog.component";
import EditBlog from "./routes/edit-blog/edit-blog.component";
import axios from "axios";
import { useEffect } from "react";
import { addBlog } from "./features/blog/blogsSlice";
import { Blog } from "./models/blog.model";
import { useAppDispatch } from "../src/app/hooks";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get<Blog[]>('http://localhost:8000/blogs')
      .then((response) => {
        response.data.forEach((blog) => {
          dispatch(addBlog(blog));
        }
        )
      })
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/blog/add" element={<AddBlog />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
      </Route>
    </Routes>
  );
}

export default App;
