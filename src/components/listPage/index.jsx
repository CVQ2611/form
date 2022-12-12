import { Spin, Table } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { userHomeLoading, userSelector } from "../../app/selector";
import { columns } from "../../constant";

function ListPage() {
    const data = useSelector(userSelector)
    const loadingHome = useSelector(userHomeLoading)

    return (
        <>
            {loadingHome === 'pendding'
                ? <Spin
                    tip={'Đợi Xíu Bạn Nhé!'}
                    size={'default'}
                    style={{ marginLeft: '50%', marginTop: '50px' }}
                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                : <Table columns={columns} dataSource={data} rowKey={data => data.id} />
            }
        </>
    )
}

export default ListPage;