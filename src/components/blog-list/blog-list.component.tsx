import { Blog } from "../../models/blog.model";
import BlogCard from "../blog-card/blog-card.component";

const BlogList = ({ blogs }: { blogs: Blog[] }) => {

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
};
export default BlogList;