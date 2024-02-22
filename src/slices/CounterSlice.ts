import { Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import API_Endpoints from "../utils/API_Endpoints";

export interface IfetchPOST {
  author: string;
  id: number;
  title: string;
}
export const fetchPOSTS = createAsyncThunk<IfetchPOST[] | unknown, { value: number }>(
"counter/fetchPOSTS",
 async ({ value = 0 }, thunkAPI) => {
  // const dispatch = thunkAPI.dispatch;
  console.log(value);

  const res = await axios.get(API_Endpoints.GET_POST);

  if (res != null) {
    console.log("List ", res);
    if (res.data) {
      return res.data as IfetchPOST[];
    }

    return thunkAPI.rejectWithValue({ message: "data not found..." });
  }
});

export interface IPostCount {
  count: number;
}

export const Post_Counter = createAsyncThunk<IPostCount | null >(
  "counter/getcount",
  async (_, thunkAPI) => {
    const state:RootState = await thunkAPI.getState();
    const params = {
        count : state.Counter.count
    }
    const res = await axios.post(API_Endpoints.POST_COUNT,params);

    console.log("post counter api", res.data);
    if (res != null) {
      return res.data as IPostCount;
    }
    return thunkAPI.rejectWithValue({ message: "count not found..." });
  }
);

interface ICounter {
  count: number | null | string | IPostCount | undefined;
  data: unknown;
  error: object;
  loading: boolean;
}
const initialState: ICounter = {
  count: 1,
  data: null,
  error: {},
  loading: true,
};

export const CounterSlice: Slice = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload; 
    },
    resetCount: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPOSTS.fulfilled, (state, { payload }) => {
      state.data = payload;
    });
    builder.addCase(fetchPOSTS.pending, (state, { payload }) => {
      state.data = payload;
    });
    builder.addCase(fetchPOSTS.rejected, (state, action) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    // Post_Counter
    builder.addCase(Post_Counter.fulfilled, (state, action) => {
      state.count = action.payload?.count;
    });
    builder.addCase(Post_Counter.pending, (state, action) => {
      console.log("loading...");
    });
    builder.addCase(Post_Counter.rejected, (state, action) => {
      state.count = "Data not Found...";
    });
  },
});

export const { setCount, resetCount } = CounterSlice.actions;

export const selectCount = (state: RootState) => state.Counter.count;
export const selectData = (state:RootState) => state.Counter.data;

export default CounterSlice.reducer;
