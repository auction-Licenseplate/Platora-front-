import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null; // 이메일 저장용 상태
}

const initialState: UserState = {
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail } = userSlice.actions;
export default userSlice.reducer;
