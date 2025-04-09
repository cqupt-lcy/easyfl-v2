import React from 'react'
import {addItem} from '../../../features/itemSlice'
import { useDispatch } from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import { useSelector } from 'react-redux'
import './index.css'
export default function HandleAdd() {
  const dispatch = useDispatch()
  const item = useSelector(state => state.items)
  const handleAddItem = ()=>{
      const newItem = {
        name: "任务",
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
      }
      dispatch(addItem(newItem))
      console.log(item);
  }
  return (
    <div >
      <button onClick={handleAddItem} className='addButton'>新建任务</button>
    </div>
  )
}
