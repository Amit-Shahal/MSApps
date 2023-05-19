import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Tooltip,
} from '@mui/material';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '../app/hooks';
import { fetchImages } from '../features/counter/imageSlice';

export default function UserInputArea({
  next,
  page,
}: {
  next: boolean;
  page: number;
}) {
  const dispatch = useAppDispatch();
  const [category, setCategory] = React.useState('');
  const [sort, setSort] = React.useState(false);

  const nextNine = () => {
    dispatch(fetchImages({ page: page + 1, category, sort }));
  };
  const prevNine = () => {
    dispatch(fetchImages({ page: page - 1, category, sort }));
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    dispatch(fetchImages({ page: 1, category: event.target.value, sort }));
  };
  const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.checked);
    dispatch(fetchImages({ page: 1, category, sort: event.target.checked }));
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '5px' }}>
      <Grid container item xs={4} justifyContent="center">
        <Button variant="contained" onClick={prevNine} disabled={page === 1}>
          Prev
        </Button>
      </Grid>
      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        xs={4}>
        <BasicSelect category={category} handleChange={handleChange} />
        <FormGroup>
          <Tooltip title="Sort By ID">
            <Switch onChange={handleSort} />
          </Tooltip>
        </FormGroup>
      </Grid>
      <Grid container item xs={4} justifyContent="center">
        <Button variant="contained" onClick={nextNine} disabled={!next}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
}

type Props = {
  category: string;
  handleChange: (event: SelectChangeEvent) => void;
};

function BasicSelect({ category, handleChange }: Props) {
  return (
    <>
      <FormControl sx={{ width: '80%' }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}>
          <MenuItem value={'sport'}>Sport</MenuItem>
          <MenuItem value={'cats'}>Cats</MenuItem>
          <MenuItem value={'Winnie the pooh'}>Winnie the pooh</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
