import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userToken: string | null; // 이메일 저장용 상태
}

const initialState: UserState = {
  userToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
  },
});

export const { setUserToken } = userSlice.actions;
export default userSlice.reducer;
