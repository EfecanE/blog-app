import { Blog } from "../../models/blog.model";
import { Card, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from "../../app/hooks";
import { deleteBlog } from "../../features/blog/blogsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography

const BlogCard = ({ blog }: { blog: Blog }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const removeBlog = () => {
        axios.delete('http://localhost:8000/blogs/' + blog.id);
        dispatch(deleteBlog(blog));
    }

    const editBlog = () => {
        navigate('/blog/edit/' + blog.id);
    }

    return (
        <Card bordered={true}
            actions={[
                <EditOutlined onClick={editBlog} key="Edit" />,
                <DeleteOutlined onClick={removeBlog} key="Delete" />,
            ]} style={{ width: '40%' }} title={blog.title}>

            <Text>{blog.content}</Text>
            <Title italic level={5}>{blog.author}</Title>
            <Text type="secondary" italic>{(new Date(blog.createdAt).toLocaleDateString())}</Text>
        </Card>
    )
}

export default BlogCard;