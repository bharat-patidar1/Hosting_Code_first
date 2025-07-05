import { createSlice } from "@reduxjs/toolkit";


const employeeSlice = createSlice({
    name : "employee",
    initialState : {
        allEmployees : []
    },
    reducers :{
        //actions
        setAllEmployees : (state , action)=>{
            state.allEmployees = action.payload;
        },
    }
})
export const {setAllEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;