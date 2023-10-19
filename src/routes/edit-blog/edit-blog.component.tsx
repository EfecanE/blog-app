import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Blog } from "../../models/blog.model";
import { Flex, Input, Button, message, Typography, Form, Spin } from "antd";
import { AddBlogFormFields } from "../../types/add-blog-form-fields";
import { useAppDispatch } from "../../app/hooks";
import { updateBlog } from "../../features/blog/blogsSlice";

const { Title } = Typography;

const EditBlog = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog>();
    const [loading, setLoading] = useState<boolean>(true);

    const onFormValid = (values: Blog) => {
        const blogData: Blog = { ...blog!, title: values.title, author: values.author, content: values.content, createdAt: new Date().toString() };
        appDispatch(updateBlog(blogData));
        axios.patch('http://localhost:8000/blogs/' + id, blogData);
        messageApi.open({
            type: 'success',
            content: 'Blog başarılı bir şekilde düzenlendi.',
        });
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    const onFormInvalid = (errorInfo: any) => {
        messageApi.open({
            type: 'error',
            content: 'Lütfen blog ekleme alanını kontrol ediniz.',
        });
    };

    useEffect(() => {
        setLoading(true);
        axios.get<Blog>('http://localhost:8000/blogs/' + id)
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
                {contextHolder}
                <Title> Blog Düzenle </Title>
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{ minWidth: 500 }}
                    initialValues={{ author: blog?.author, title: blog?.title, content: blog?.content }}
                    onFinish={onFormValid}
                    onFinishFailed={onFormInvalid}
                    autoComplete="off"
                >
                    <Form.Item<AddBlogFormFields>
                        label="Blog İsmi"
                        name="title"
                        rules={[{ required: true, message: 'Lütfen blog ismini giriniz!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<AddBlogFormFields>
                        label="Yazar"
                        name="author"
                        rules={[{ required: true, message: 'Lütfen blog yazarını giriniz!' }]}
                    >
                        <Input value={blog?.author} />
                    </Form.Item>

                    <Form.Item<AddBlogFormFields>
                        label="İçerik"
                        name="content"
                        rules={[{ required: true, message: 'Lütfen Blog içeriğini giriniz.' }]}
                    >
                        <Input.TextArea value={blog?.content} cols={20} rows={10} />
                    </Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type='primary' htmlType='submit'>
                            Düzenle
                        </Button>
                    </div>
                </Form>
            </Flex>
        )
    }
}
export default EditBlog;