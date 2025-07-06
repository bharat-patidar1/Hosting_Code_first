import { createSlice } from "@reduxjs/toolkit";


const attendanceSlice = createSlice({
    name : 'attendance',
    initialState :{
        isClockedIn : false
    },
    reducers :{
        //actions
        setIsClockedin : (state , action)=>{
            state.isClockedIn = action.payload;
        }
    }
})
export const {setIsClockedin} = attendanceSlice.actions;
export default attendanceSlice.reducer;