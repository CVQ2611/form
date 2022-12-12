import { Button, ConfigProvider, Empty, List, Modal, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userDetailSelector } from "../../app/selector";
import { getDataToReduceByID } from "../../reducer/getDataUserByID";
import { deleteUserById } from "../../sevices/deleteUser";
import ListInfoItem from "../ListInfoItem";

function DetailInfomation() {
    const [deleteComplete, setDeletComplete] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    // get params
    const { id } = useParams()
    const dispatch = useDispatch()
    const dataDetail = useSelector(userDetailSelector)
    useEffect(() => {
        dispatch(getDataToReduceByID(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (deleteComplete) {
            const deleteData = async () => {
                try {
                    const deleteUser = await deleteUserById(id)
                    window.location.reload(true)
                    return deleteUser
                } catch (error) {
                    setErrorModal(!errorModal);
                }
            }
            deleteData()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteComplete])
    const deleteUserOnClick = () => {
        setShowModal(!showModal)
    }
    return (

        <ConfigProvider renderEmpty={() => <Empty description={'Oppss'} />}>
            <List
                header={<div style={{ fontSize: '18px', fontWeight: '600' }}>User Info</div>}
                bordered
                dataSource={Object.keys(dataDetail).length === 0 ? [] : [dataDetail]}
                renderItem={(item) => (
                    <ListInfoItem item={item} />
                )}
                style={{ marginBottom: '20px', backgroundColor: 'white' }}
            />
            {Object.keys(dataDetail).length > 0 ?
                <Row style={{ justifyContent: 'end', marginBottom: '20px' }}>
                    <Button danger onClick={deleteUserOnClick} style={{ marginRight: '24px' }}>Delete</Button>
                    <Button>
                        <Link to={`edit`}>Edit</Link>
                    </Button>
                </Row> : ''}
            <Modal
                open={showModal}
                onOk={() => { setDeletComplete(!deleteComplete); setShowModal(!showModal) }}
                onCancel={() => setShowModal(!showModal)}
            >
                <Typography.Text type="danger">Bạn có chắc chắn muốn xóa không?</Typography.Text>
            </Modal>
            <Modal
                open={errorModal}
                onOk={() => { setErrorModal(!errorModal) }}
                onCancel={() => setErrorModal(!errorModal)}
            >
                <Typography.Text type="warning">Error</Typography.Text>
            </Modal>
        </ConfigProvider >
    )
}

export default DetailInfomation;