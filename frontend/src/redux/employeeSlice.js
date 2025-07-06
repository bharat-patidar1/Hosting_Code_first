import { createSlice } from "@reduxjs/toolkit";


const employeeSlice = createSlice({
    name : "employee",
    initialState : {
        allEmployees : [],
        totalHours : 0
    },
    reducers :{
        //actions
        setAllEmployees : (state , action)=>{
            state.allEmployees = action.payload;
        },
        setTotalHours : (state , action)=>{
            state.totalHours = action.payload
        }
    }
})
export const {setAllEmployees , setTotalHours} = employeeSlice.actions;
export default employeeSlice.reducer;