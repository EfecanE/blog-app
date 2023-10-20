import { Blog } from "../../models/blog.model";
import { Card, Typography, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useAppDispatch } from "../../app/hooks";
import { deleteBlog } from "../../features/blog/blogsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const { Title, Text } = Typography

const BlogCard = ({ blog }: { blog: Blog }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const removeBlog = () => {
        axios.delete('http://localhost:3001/blogs/' + blog.id);
        dispatch(deleteBlog(blog));
        setOpen(false);
    }

    const editBlog = () => {
        navigate('/blog/edit/' + blog.id);
    }

    const detailBlog = () => {
        navigate('/blog/' + blog.id);
    }

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Card bordered={true}
                actions={[
                    <EyeOutlined onClick={detailBlog} key="Detail" />,
                    <EditOutlined onClick={editBlog} key="Edit" />,
                    <DeleteOutlined onClick={showModal} key="Delete" />
                ]} style={{ width: '40%' }} title={blog.title}>

                <Text>{blog.content}</Text>
                <Title italic level={5}>{blog.author}</Title>
                <Text type="secondary" italic>{(new Date(blog.createdAt).toLocaleDateString())}</Text>
            </Card>
            <Modal
                open={open}
                onOk={removeBlog}
                onCancel={hideModal}
                okText="Sil"
                cancelText="İptal"
                centered
            >
                <Text>Bu blog'u silmek istediğinize emin misiniz?</Text>

            </Modal>
        </>


    )
}

export default BlogCard;