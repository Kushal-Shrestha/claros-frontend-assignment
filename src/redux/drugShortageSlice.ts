import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DrugShortageData {
  term: string;
  count: number;
}

interface DrugShortageState {
  data: DrugShortageData[];
  loading: boolean;
  error: string | null;
  filter: "all" | "unavailable" | "limited" | "available";
}

const initialState: DrugShortageState = {
  data: [],
  loading: false,
  error: null,
  filter: "all",
};

const getApiUrl = (filter: string) => {
  switch (filter) {
    case "unavailable":
      return 'https://api.fda.gov/drug/shortages.json?search=availability:"Unavailable"&count=therapeutic_category';
    case "limited":
      return 'https://api.fda.gov/drug/shortages.json?search=availability:"Limited Availability"&count=therapeutic_category';
    case "available":
      return 'https://api.fda.gov/drug/shortages.json?search=availability:"Available"&count=therapeutic_category';
    default:
      return "https://api.fda.gov/drug/shortages.json?count=therapeutic_category";
  }
};

export const fetchDrugShortages = createAsyncThunk(
  "drugShortages/fetchDrugShortages",
  async (filter: string) => {
    const response = await fetch(getApiUrl(filter));
    if (!response.ok) {
      throw new Error("Failed to fetch drug shortages data");
    }
    const data = await response.json();
    return data.results;
  }
);

const drugShortageSlice = createSlice({
  name: "drugShortages",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrugShortages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrugShortages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDrugShortages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch drug shortages";
      });
  },
});

export const { setFilter } = drugShortageSlice.actions;
export default drugShortageSlice.reducer;
