import React from 'react';
import { Button, Form, Input, Typography, Flex, message } from 'antd';
import { AddBlogFormFields } from '../../types/add-blog-form-fields';
import { Blog } from '../../models/blog.model';
import axios from 'axios';
import { v4 as uuid } from "uuid";
import { redirect, useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../app/hooks';
import { addBlog } from '../../features/blog/blogsSlice';

const { Title } = Typography;

const AddBlog = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFormValid = (values: Blog) => {
        const blogData: Blog = { ...values, id: uuid(), createdAt: new Date().toString() };
        appDispatch(addBlog(blogData));
        axios.post('http://localhost:3001/blogs', blogData);
        messageApi.open({
            type: 'success',
            content: 'Blog başarılı bir şekilde eklendi.',
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


    return (
        <Flex align='center' justify='center' vertical style={{ height: '100%' }} gap={50} >
            {contextHolder}
            <Title> Blog Ekle </Title>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                style={{ minWidth: 500 }}
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
                    <Input />
                </Form.Item>

                <Form.Item<AddBlogFormFields>
                    label="İçerik"
                    name="content"
                    rules={[{ required: true, message: 'Lütfen Blog içeriğini giriniz.' }]}
                >
                    <Input.TextArea cols={20} rows={10} />
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='primary' htmlType='submit'>
                        Ekle
                    </Button>
                </div>
            </Form>
        </Flex>
    )
};

export default AddBlog;
