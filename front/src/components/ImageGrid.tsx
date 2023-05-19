import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Image as ImageInterface } from '../features/counter/imageSlice';

export default function StandardImageList({
  data,
}: {
  data: ImageInterface[];
}) {
  return (
    <ImageList sx={{ width: 500, height: 610 }} cols={3} rowHeight={200}>
      {data.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`${item.webformatURL}?w=164&h=164&fit=crop&auto=format`}
            alt={item.user}
            style={{ objectFit: 'contain', height: 200 }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
