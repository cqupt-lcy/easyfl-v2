import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'
const initialState =  JSON.parse(localStorage.getItem('itemList'))|| [{
  id: "1",
  name: "task1",
  parameters:{
    method: 'fedavg',
    heterogeneity: true,
    isAsync: true,
    dataset: 'BloodMnist',
    learningRate: 0.1,
    dirichlet: 0.1,
    clientNum: 20
  },
  logs:[],
  result:[],
  status:{trainning:false,connected:false}
}]
const updateLocalStorage = (itemList) => {
  localStorage.setItem('itemList', JSON.stringify(itemList));
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push({
        id: uuidv4(),
        ...action.payload
      })
      updateLocalStorage(state)
    },
    deleteItem: (state, action) => {
      const id = action.payload
      const index = state.findIndex(t => t.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      updateLocalStorage(state);
    },
    setParameters:(state, action) => {
      state.item.parameters = {...state.item.parameters,...action.payload}
      updateLocalStorage(state)
    },
    updateLogs: (state, action) => {
      const { id, log } = action.payload;
      const task = state.find(t => t.id === id);
      if (task) {
        task.logs.push(log);
        updateLocalStorage(state);
      }
    },
    updateResults: (state, action) => {
      const { id, res } = action.payload;
      const task = state.find(t => t.id === id);
      if (task) {
        task.result.push(res);
        updateLocalStorage(state);
      }
    },
    clearResults:(state,action)=>{
      const {id} =action.payload;
      const task = state.find(t=>t.id===id)
      if(task){
        task.result=[]
      }
    },
    updateParameters: (state, action) => {
      const { id, key, value } = action.payload
      const task = state.find(item => item.id == id)
      if (task) {
        task.parameters[key] = value
        updateLocalStorage(state);
      }
    },
    updateState:(state,action)=>{
      const {id, key, value} = action.payload;
      const task = state.find(item => item.id ==id)
      if(task){
        task.status[key] = value
        updateLocalStorage(state)
      }
    },
    resetSettings:(state,action)=>{
      const id = action.payload
      const task = state.find(item=>item.id==id)
      if(task){
        task.parameters={
          method: 'fedavg',
          heterogeneity: true,
          isAsync: true,
          dataset: 'BloodMnist',
          learningRate: 0.1,
          dirichlet: 0.1,
          clientNum: 20
        }
        task.result=[]
        task.status={trainning:false,connected:false}
      }
    },
    rename:(state,action)=>{
      const {id,newName} = action.payload
      console.log(newName);
      const task = state.find(item => item.id ==id)
      if(task){
        task.name = newName
        updateLocalStorage(state)
      }
    }

    
  }
})

export const { addItem, deleteItem,setParameters,updateLogs,updateResults,updateParameters,updateState,clearResults,resetSettings,rename } = itemSlice.actions
export default itemSlice.reducer