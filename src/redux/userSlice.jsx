import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch users from API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
  },
  reducers: {
    toggleDarkMode: (state, action) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.darkMode = !user.darkMode;
      }
    },
    editUser: (state, action) => {
      const { id, field, value } = action.payload;
      const user = state.users.find(user => user.id === id);
      if (user) {
        user[field] = value;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.map(user => ({ ...user, darkMode: false }));
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { toggleDarkMode, editUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
