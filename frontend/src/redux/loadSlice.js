import  { createSlice } from "@reduxjs/toolkit"



const loadSlice = createSlice({
    name : "load",
    initialState : {
        loading : false
    },
    reducers : {
        //actions
        setLoading  : (state , action)=>{
            state.loading = action.payload;
        }
    }
})
export const {setLoading} = loadSlice.actions;
export default loadSlice.reducer;