import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployeeDetail = createAsyncThunk(
  'employeeDetail/fetchDetail',
  async (id) => {
    const response = await axios.get(`/api/employees/detail/${id}`);
    return response.data.data;
  }
);

const employeeDetailSlice = createSlice({
  name: 'employeeDetail',
  initialState: {
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default employeeDetailSlice.reducer;
