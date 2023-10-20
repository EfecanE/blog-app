import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Flex, Spin, Typography } from "antd";
import { Blog } from "../../models/blog.model";

const { Title, Text } = Typography;

const BlogDetail = () => {
    const [blog, setBlog] = useState<Blog>({} as Blog);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/blogs/${id}`)
            .then((response) => {
                setBlog(response.data);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return (
            <Flex align="center" justify="center" style={{ height: '100%', }}>
                <Spin size="large" />
            </Flex>
        )
    } else {
        return (
            <Flex align='center' justify='center' vertical style={{ height: '100%' }} gap={50} >
                <Flex justify="flex-end" style={{ width: '50%' }}>
                    <Text italic type="secondary">{new Date(blog.createdAt).toLocaleDateString()}</Text>
                </Flex>
                <Flex align="center" vertical style={{ width: '50%' }}>
                    <Title>{blog.title}</Title>
                    <Text>{blog.content}</Text>
                </Flex>
                <Flex justify="flex-end" style={{ width: '50%' }}>
                    <Text strong italic>{blog.author}</Text>
                </Flex>
            </Flex>
        )
    }


}

export default BlogDetail;