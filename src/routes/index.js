import { createBrowserRouter } from "react-router-dom";
import CreatePage from "../components/createPage";
import DetailInfomation from "../components/detailInfomation";
import EditPage from "../components/editPage";
import ListPage from "../components/listPage";
import Defaulayout from "../layout/defaultLayout";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Defaulayout />,
        children: [
            {
                path: '/',
                element: <ListPage />,
            },
            {
                path: '/create',
                element: <CreatePage />
            },
            {
                path: '/users/:id',
                element: <DetailInfomation />
            },
            {
                path: '/users/:id/edit',
                element: <EditPage />
            },
        ]
    },
])