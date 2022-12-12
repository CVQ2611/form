import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDataToReduce } from './reducer/getDataSlice';
import { routes } from './routes';
import { useEffect } from 'react';
import { autoLoadPage } from './app/selector';


function App() {
  const dispatch = useDispatch()
  const load = useSelector(autoLoadPage)
  useEffect(() => {
    dispatch(getDataToReduce());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load])

  return (
    <RouterProvider router={routes} />
  );
}

export default App;
