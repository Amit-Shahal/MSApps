import { useEffect } from 'react';
//redux
import { useAppSelector, useAppDispatch } from './app/hooks';
import { selectUsers, fetchUsers } from './features/counter/userSlice';
//components

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const data = useAppSelector(selectUsers);

  return (
    <div>
      <div>
        {data.loading && <div>loading...</div>}
        {!data.loading && data.status === 'failed' ? (
          <div>Error: {data.status}</div>
        ) : null}
        {!data.loading ? <h1>hi</h1> : null}
      </div>
    </div>
  );
}

export default App;
