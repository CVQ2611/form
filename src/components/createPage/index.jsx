import { Button, Checkbox, DatePicker, Form, Input, message, Radio, Row, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { schema } from "../../constant";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";
import { setAutoLoadingSlice } from '../../reducer/setLoadingPage'
import { createUser } from "../../sevices/postUser";

const { Text } = Typography;



function CreatePage() {
    const [back, setBack] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const dispath = useDispatch()
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Xong Rùi Bạn Nhé',
            style: { marginTop: '80px' }
        });
    };

    const { handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            isGraduate: false,
        },
        resolver: yupResolver(schema),
    })

    const onCreateProfile = (data) => {
        data.dateOfBirth = dayjs(data.dateOfBirth).unix()
        const createProfile = async () => {
            try {
                const res = await createUser(data)
                success()
                dispath(setAutoLoadingSlice.actions.SET_AUTOLOAD())
                setTimeout(() => {
                    setBack(!back)
                }, 2000)
                return res;
            } catch (error) {
                return error
            }
        }
        createProfile()
    }

    return (
        <>
            {back && <Navigate to={'/'} />}
            {contextHolder}
            <Form onFinish={handleSubmit(onCreateProfile)}>
                <Form.Item label='First Name'>
                    <Controller
                        control={control}
                        name='firstName'
                        render={
                            ({ field }) => <Input {...field} status={errors.firstName && 'error'} />
                        }
                    />
                    {errors.firstName && <Text type="danger">{errors.firstName.message}</Text>}
                </Form.Item>
                <Form.Item label='Last Name'>
                    <Controller
                        control={control}
                        name='lastName'
                        render={
                            ({ field }) => <Input {...field} status={errors.lastName && 'error'} />
                        }
                    />
                    {errors.lastName && <Text type="danger">{errors.lastName.message}</Text>}
                </Form.Item>
                <Form.Item label='Gender'>
                    <Controller
                        control={control}
                        name='gender'
                        render={
                            ({ field }) => <Radio.Group {...field}>
                                <Radio value='Male'>Male</Radio>
                                <Radio value='Female'>Female</Radio>
                            </Radio.Group>
                        }
                    />
                    {errors.gender && <Text type="danger">{errors.gender.message}</Text>}
                </Form.Item>
                <Form.Item label='Phone Number'>
                    <Controller
                        control={control}
                        name='phone'
                        render={
                            ({ field }) => <Input {...field} status={errors.phone && 'error'} />
                        }
                    />
                    {errors.phone && <Text type="danger">{errors.phone.message}</Text>}
                </Form.Item>
                <Form.Item label='Address'>
                    <Controller
                        control={control}
                        name='address'
                        render={
                            ({ field }) => <Input {...field} status={errors.address && 'error'} />
                        }
                    />
                    {errors.address && <Text type="danger">{errors.address.message}</Text>}
                </Form.Item>
                <Form.Item label='Date of birth'>
                    <Controller
                        control={control}
                        name='dateOfBirth'
                        render={
                            ({ field }) => <DatePicker {...field} />
                        }
                    />
                    {errors.dateOfBirth && <Text type="danger">{errors.dateOfBirth.message}</Text>}
                </Form.Item>
                <Form.Item label='School'>
                    <Controller
                        control={control}
                        name='school'
                        render={
                            ({ field }) => <Select {...field}
                                options={[
                                    { value: 'PTIT1', label: 'PTIT 1' },
                                    { value: 'PTIT2', label: 'PTIT 2' },
                                    { value: 'PTIT3', label: 'PTIT 3' },
                                    { value: 'PTIT4', label: 'PTIT 4' }
                                ]}
                            />
                        }
                    />
                    {errors.school && <Text type="danger">{errors.school.message}</Text>}
                </Form.Item>
                <Form.Item label='Graduate' valuePropName="checked">
                    <Controller
                        control={control}
                        name='isGraduate'
                        render={
                            ({ field }) => <Checkbox {...field} checked={watch('isGraduate')} onChange={() => setValue('isGraduate', !watch('isGraduate'))}>Graduated</Checkbox>
                        }
                    />
                    {errors.isGraduate && <Text type="danger">{errors.isGraduate.message}</Text>}
                </Form.Item>
                <Form.Item label='Email'>
                    <Controller
                        control={control}
                        name='email'
                        render={
                            ({ field }) => <Input {...field} />
                        }
                    />
                    {errors.email && <Text type="danger">{errors.email.message}</Text>}
                </Form.Item>
                <Form.Item label='Favourites'>
                    <Controller
                        control={control}
                        name='favourites'
                        render={
                            ({ field }) => <Checkbox.Group {...field} options={[
                                { label: 'Cat', value: 'Cat' },
                                { label: 'Dog', value: 'Dog' },
                                { label: 'Bear', value: 'Bear' },
                            ]} />
                        }
                    />
                    {errors.favourites && <Text type="danger">{errors.favourites.message}</Text>}
                </Form.Item>
                <Row style={{ marginBottom: '30px', justifyContent: 'end' }}>
                    <Button type="primary" htmlType="submit" >Create</Button>
                </Row>
            </Form>
        </>
    )
}

export default CreatePage;