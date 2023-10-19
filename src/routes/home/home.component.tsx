import { useAppSelector } from "../../app/hooks";
import { Blog } from "../../models/blog.model";
import BlogList from "../../components/blog-list/blog-list.component";

const Home = () => {

    const blogs: Blog[] = useAppSelector((state) => state.blogs);

    return (
        <BlogList blogs={blogs} />
    );
}

export default Home;