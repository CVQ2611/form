import MoreButton from "../components/moreButton";
import * as yup from "yup";
import dayjs from "dayjs";
// eslint-disable-next-line
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const styleHeader = {
    position: 'sticky',
    top: 0,
    zIndex: 9999,
    width: '100%',
    backgroundColor: 'white',
}

export const styleContent = {
    padding: '0 50px',
    paddingTop: '30px',
    backgroundColor: 'white'
}

export const headerButton = [
    {
        key: 1,
        name: 'List',
        path: '/'
    },
    {
        key: 2,
        name: 'Create',
        path: '/create'
    },
]

export const columns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        align: 'center',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        align: 'center'
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        align: 'center',
        filters: [
            {
                text: 'Male',
                value: 'Male',
            },
            {
                text: 'Female',
                value: 'Female',
            },
        ],
        onFilter: (value, record) => record.gender.indexOf(value) === 0,
        sortDirections: ['descend'],
    },
    {
        title: 'More',
        render: (_, recort) => <MoreButton idUsers={recort.id} />,
        align: 'center'
    },
];


export const schema = yup.object().shape({
    firstName: yup.string().required('Please input your First name')
        .test('firstName', 'Please input true your First name', (firstName) => firstName && firstName.trim().length > 0),
    lastName: yup.string().required('Please input your Last name')
        .test('lastName', 'Please input true your Last name', (lastName) => lastName && lastName.trim().length > 0),
    gender: yup.string().required('Please input your Gender'),
    phone: yup.string().required('Please input your Phone Number').matches(phoneRegex, 'Please input true phone number'),
    address: yup.string().required('please input your address')
        .test('lastName', 'Please input true your address', (address) => address && address.trim().length > 0),
    dateOfBirth: yup.string('').required('Please input your birthday')
        .test('dateOfBirth', 'Please sure 18 +', (date) => dayjs().diff(dayjs(date), "years") >= 18)
        .nullable(),
    school: yup.string().required('Please input your school'),
    isGraduate: yup.boolean(),
    email: yup.string().email('Please input your true email').required('Please input your email'),
}).required();


export const checkData = (dataObjectOne, dataObjectTwo) => {
    const oldFavourites = dataObjectTwo.favourites;
    const newFavourites = dataObjectOne.favourites;
    const checkFavoriste = () => {
        let isEqual;

        if (oldFavourites.length !== newFavourites.length) {
            isEqual = false;
        }
        else {
            for (let i = 0; i < oldFavourites.length; i++) {
                if (oldFavourites[i] !== newFavourites[i]) {
                    isEqual = false;
                    break;
                }
                isEqual = true;
            }
        }
        return isEqual;
    }
    if (
        dataObjectOne.firstName === dataObjectTwo.firstName &&
        dataObjectOne.lastName === dataObjectTwo.lastName &&
        dataObjectOne.gender === dataObjectTwo.gender &&
        dataObjectOne.phone === dataObjectTwo.phone &&
        dataObjectOne.address === dataObjectTwo.address &&
        dataObjectOne.dateOfBirth === dataObjectTwo.dateOfBirth &&
        dataObjectOne.school === dataObjectTwo.school &&
        dataObjectOne.isGraduate === dataObjectTwo.isGraduate &&
        dataObjectOne.email === dataObjectTwo.email &&
        checkFavoriste()
    ) {
        return true
    } else {
        return false
    }
}