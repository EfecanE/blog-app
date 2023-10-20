import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Blog } from "../../models/blog.model";
import BlogList from "../../components/blog-list/blog-list.component";
import axios from "axios";
import { useEffect } from "react";
import { addBlog } from "../../features/blog/blogsSlice";
import { RootState } from "../../app/store";

const Home = () => {

    const dispatch = useAppDispatch();
    const blogs = useAppSelector<Blog[]>((state: RootState) => state.blogs);

    useEffect(() => {
        if (blogs.length > 0) return;
        axios.get<Blog[]>('http://localhost:3001/blogs')
            .then((response) => {
                response.data.forEach((blog) => {
                    dispatch(addBlog(blog));
                }
                )
            })
    }, []);

    return (
        <BlogList />
    );
}

export default Home;