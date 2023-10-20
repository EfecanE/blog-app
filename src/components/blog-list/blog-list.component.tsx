import { Blog } from "../../models/blog.model";
import { useAppSelector } from "../../app/hooks";
import { Flex } from "antd";
import BlogCard from "../blog-card/blog-card.component";

const BlogList = () => {

    const blogs = useAppSelector<Blog[]>(state => state.blogs);

    return (
        <Flex wrap="wrap" justify="center" gap={10} style={{ padding: '10px', background: '#f5f5f5' }} >
            {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </Flex>
    );
};
export default BlogList;