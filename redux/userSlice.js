import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        canGoBack: false
    },
    reducers: {
        userAction(state, action) {
            state.user = action.payload
        },
        canGoBackAction(state, action) {
            state.canGoBack = action.payload
        }
    }
})

export const { userAction, canGoBackAction } = userSlice.actions
export default userSlice.reducer