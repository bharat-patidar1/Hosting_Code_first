import { createSlice } from "@reduxjs/toolkit";


const leaveSlice = createSlice({
    name : "leave",
    initialState : {
        allLeaves : []
    },
    reducers : {
        //actions
        setAllLeaves : (state , action)=>{
            state.allLeaves = action.payload;
        }
    }
})
export const {setAllLeaves} = leaveSlice.actions;
export default leaveSlice.reducer;