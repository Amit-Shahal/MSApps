import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Image {
  id: number;
  webformatURL: string;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user: string;
  userImageURL: string;
}
export interface Data {
  data: Image[];
  next: boolean;
  page: number;
}

export interface ImageState {
  loading: Boolean;
  images: Data;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ImageState = {
  loading: false,
  images: { data: [], next: false, page: 1 },
  status: 'idle',
};

export const fetchImages = createAsyncThunk(
  'image/fetchImages',
  async (data: { page: number; category: string; sort: boolean }) => {
    const { page, category, sort } = data;
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      page: page,
      category: category,
      sortID: sort,
    });
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    return await fetch('http://localhost:3000/images/get-nine', requestOptions)
      .then((res) => res.json())
      .catch((error) => console.log('error', error));
  }
);

export const userSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    // addUser: (state, action: PayloadAction<User>) => {
    //   action.payload.id = state.users.length.toString();
    //   state.users.unshift(action.payload);
    //   state.filteredItems = state.users;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'idle';
        state.images = action.payload;
        state.loading = false;
      })
      .addCase(fetchImages.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  },
});

// export const { addUser } = userSlice.actions;

export const selectUsers = (state: RootState) => state.image;

export default userSlice.reducer;
