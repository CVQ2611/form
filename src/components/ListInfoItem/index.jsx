import { List, Typography } from "antd"
import dayjs from "dayjs";

function ListInfoItem({ item }) {
    return (
        <>
            <List.Item>
                <Typography.Text>First Name: </Typography.Text> {item.firstName}
            </List.Item>
            <List.Item>
                <Typography.Text>Last Name: </Typography.Text> {item.lastName}
            </List.Item>
            <List.Item>
                <Typography.Text>Gender: </Typography.Text> {item.gender}
            </List.Item>
            <List.Item>
                <Typography.Text>Phone: </Typography.Text> {item.phone}
            </List.Item>
            <List.Item>
                <Typography.Text>Address: </Typography.Text> {item.address}
            </List.Item>
            <List.Item>
                <Typography.Text>Date Of Birth: </Typography.Text> {dayjs.unix(item.dateOfBirth).format('DD/MM/YYYY')}
            </List.Item>
            <List.Item>
                <Typography.Text>School: </Typography.Text> {item.school}
            </List.Item>
            <List.Item>
                <Typography.Text>Graduate: </Typography.Text> {item.isGraduate ? 'Da tot nghiep' : 'Chua tot nghiep'}
            </List.Item>
            <List.Item>
                <Typography.Text>Email: </Typography.Text> {item.email}
            </List.Item>
            <List.Item style={{ display: 'block', justifyContent: 'start' }}>
                <Typography.Text>Favourites: </Typography.Text>
                {item.favourites.map((data, index) => <Typography.Text key={index} style={{ display: 'block', marginLeft: '16px' }}>
                    * {data}
                </Typography.Text>)}
            </List.Item>
        </>
    )
}

export default ListInfoItem