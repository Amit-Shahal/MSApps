import { useEffect } from 'react';
//redux
import { useAppDispatch } from './app/hooks';
import { fetchImages } from './features/counter/imageSlice';
//components
import Main from './components/Main';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    //init req
    dispatch(fetchImages({ page: 1, category: '', sort: false }));
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Main />
      </div>
    </div>
  );
}

export default App;
