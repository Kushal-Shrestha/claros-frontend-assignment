import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type RecallStatus = "Ongoing" | "Completed" | "Terminated" | "All";

export const fetchDrugs = createAsyncThunk(
  "drugs/fetchDrugs",
  async (
    { status, searchTerm }: { status: RecallStatus; searchTerm?: string },
    thunkAPI
  ) => {
    try {
      let enforcementUrl = "https://api.fda.gov/drug/enforcement.json?limit=50";

      // Build search query
      const searchParams = [];
      if (status !== "All") {
        searchParams.push(`status:"${status}"`);
      }
      if (searchTerm) {
        searchParams.push(`product_description:${searchTerm}`);
      }

      if (searchParams.length > 0) {
        const searchQuery = searchParams.join("+AND+");
        enforcementUrl = `https://api.fda.gov/drug/enforcement.json?search=${searchQuery}&limit=50`;
      }

      // Fetch drug enforcement data (recalls)
      const enforcementResponse = await axios.get(enforcementUrl);

      // Fetch drug event data (adverse events)
      const eventResponse = await axios.get(
        "https://api.fda.gov/drug/event.json?limit=100"
      );

      // Fetch drug labeling data
      const labelResponse = await axios.get(
        "https://api.fda.gov/drug/label.json?limit=100"
      );

      return {
        enforcement: enforcementResponse.data.results,
        events: eventResponse.data.results,
        labels: labelResponse.data.results,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const drugsSlice = createSlice({
  name: "drugs",
  initialState: {
    data: {
      enforcement: [],
      events: [],
      labels: [],
    },
    loading: {
      initial: false,
      table: false,
      charts: false,
    },
    error: null as string | null,
    filter: "All" as RecallStatus,
    searchTerm: "",
  },
  reducers: {
    setFilter: (state, action: { payload: RecallStatus }) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action: { payload: string }) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrugs.pending, (state, action) => {
        // If it's the initial load (no filter change), set initial loading
        if (
          action.meta.arg.status === "All" &&
          !state.data.enforcement.length
        ) {
          state.loading.initial = true;
        } else {
          // Otherwise, set table loading
          state.loading.table = true;
        }
        state.error = null;
      })
      .addCase(fetchDrugs.fulfilled, (state, action) => {
        state.loading.initial = false;
        state.loading.table = false;
        state.data = action.payload;
      })
      .addCase(fetchDrugs.rejected, (state, action) => {
        state.loading.initial = false;
        state.loading.table = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilter, setSearchTerm } = drugsSlice.actions;
export default drugsSlice.reducer;
