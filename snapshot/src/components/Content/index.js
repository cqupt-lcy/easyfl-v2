import React from 'react'
import { useParams, useRoutes } from 'react-router-dom'
import Settings from './Settings'
import { useSelector } from 'react-redux';
import Logs from './Logs';
import Charts from './Charts';
import './index.css'
export default function Content() {

  const {id} = useParams();
  const item = useSelector(state=>
    state.items.find(item => item.id == (id))
  )
  
  if(!item){
    return (
      <div><h1>
        404 not found
        </h1></div>
      )
  }
  return (
    <div className='contentWrapper'>
        <Settings/>
        <Logs/>
        <Charts/>
    </div>
  )
  
}
