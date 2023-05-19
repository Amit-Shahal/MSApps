import React from 'react';
import { Data, selectUsers } from '../features/counter/imageSlice';
import ImageGrid from './ImageGrid';
import { Grid } from '@mui/material';
import UserInputArea from './UserInputArea';
import { useAppSelector } from '../app/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function StandardImageList() {
  const data = useAppSelector(selectUsers);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <UserInputArea next={data.images.next} page={data.images.page} />
      {data.loading && <CircularIndeterminate />}
      {!data.loading && data.status === 'failed' ? (
        <div>Error: {data.status}</div>
      ) : null}
      {!data.loading ? (
        <>
          <ImageGrid data={data.images.data} />
          <Grid item>{data.images.page}</Grid>
        </>
      ) : null}
    </Grid>
  );
}

function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '610px',
      }}>
      <CircularProgress size={80} />
    </Box>
  );
}
