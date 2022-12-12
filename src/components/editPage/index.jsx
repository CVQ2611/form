import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Radio, Row, Select, message, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { userDetailSelector } from "../../app/selector";
import { checkData, schema } from "../../constant";
import { upDateDataUser } from "../../sevices/upDateData";
import { setAutoLoadingSlice } from '../../reducer/setLoadingPage';

const { Text } = Typography;

function EditPage() {
    const [showModalSuccess, setShowModalSuccess] = useState(false)
    const [showModalError, setShowModalError] = useState(false)
    const [back, setBack] = useState(false)
    const dataDetail = useSelector(userDetailSelector)
    const [messageApi, contextHolder] = message.useMessage();
    const { id } = useParams()
    const dispatch = useDispatch()
    const { handleSubmit, watch, setValue, reset, control, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    })

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Sửa Xong Rùi Bạn Nhé!',
            style: { marginTop: '80px' }
        });
    };

    useEffect(() => {
        reset({
            firstName: dataDetail.firstName,
            lastName: dataDetail.lastName,
            gender: dataDetail.gender,
            phone: dataDetail.phone,
            address: dataDetail.address,
            dateOfBirth: dayjs.unix(dataDetail.dateOfBirth),
            school: dataDetail.school,
            isGraduate: dataDetail.isGraduate,
            email: dataDetail.email,
            favourites: dataDetail.favourites
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onEditProfile = (data) => {
        const dataAfterUpDate = { ...data, dateOfBirth: dayjs(data.dateOfBirth).unix() }
        const checkUpDate = checkData(dataAfterUpDate, dataDetail)
        if (!checkUpDate) {
            const upDateNewDataUser = async () => {
                try {
                    const res = await upDateDataUser(dataAfterUpDate, id)
                    success()
                    dispatch(setAutoLoadingSlice.actions.SET_AUTOLOAD())
                    setTimeout(() => {
                        setBack(!back)
                    }, 2000)
                    return res
                } catch (error) {
                    setShowModalError(showModalError)
                }
            }
            upDateNewDataUser()
        } else {
            setShowModalSuccess(!showModalSuccess)
        }
    }

    return (
        <>
            {back && <Navigate to={'/'} />}
            {contextHolder}
            <Form onFinish={handleSubmit(onEditProfile)}>
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
                                <Radio value='FeMale'>FeMale</Radio>
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
                            ({ field }) => <Input {...field} status={errors.lastName && 'error'} />
                        }
                    />
                    {errors.phone && <Text type="danger">{errors.phone.message}</Text>}
                </Form.Item>
                <Form.Item label='Address'>
                    <Controller
                        control={control}
                        name='address'
                        render={
                            ({ field }) => <Input {...field} status={errors.adress && 'error'} />
                        }
                    />
                    {errors.adress && <Text type="danger">{errors.adress.message}</Text>}
                </Form.Item>
                <Form.Item label='Date of birth'>
                    <Controller
                        control={control}
                        name='dateOfBirth'
                        render={
                            ({ field }) => <DatePicker {...field} format={'DD/MM/YYYY'} />
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
                    <Button type="primary" htmlType="submit" >UpDate</Button>
                </Row>
                <Modal open={showModalSuccess} onCancel={() => setShowModalSuccess(!showModalSuccess)} onOk={() => setShowModalSuccess(!showModalSuccess)} style={{ textAlign: 'center' }}>
                    <Text type="warning">Có vẻ như bạn chưa thay đổi gì!</Text>
                </Modal>
                <Modal open={showModalError} onCancel={() => setShowModalError(!showModalError)} onOk={() => setShowModalError(!showModalError)} style={{ textAlign: 'center' }}>
                    <Text type="danger">Có Lỗi Rồi Đại Vương Ơi!</Text>
                </Modal>
            </Form>
        </>
    )
}

export default EditPage;