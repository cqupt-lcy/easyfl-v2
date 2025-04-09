import React, { useEffect, useState, useRef } from 'react'
import { message, Empty } from 'antd'
import { ConnectedTrue, ConnectedFalse } from './Components/Connected'
import { TrainningTrue, TrainningFalse } from './Components/Trainning'
import { useParams } from 'react-router-dom'
import { useSocket } from '../../../resource/SocketProvider'
import './index.css'
import { updateLogs, updateParameters, updateResults, updateState } from '../../../features/itemSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Logs() {
  const [logs, setLogs] = useState([])

  const [isempty, setIsEmpty] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const logContainerRef = useRef(null)
  const [messageApi, contextHolder] = message.useMessage()

  const { id } = useParams()
  const item = useSelector(state =>
    state.items.find(item => item.id == (id))
  )

  const socket = useSocket(id) // ✅ 使用全局 socket
  const dispatch = useDispatch()
  let currentRound = 0
  let pendingMetrics = {}

  useEffect(() => {
    if (!socket) return

    const handleLog = (logMessage) => {
      // dispatch(updateLogs({ id, logs,logMessage }))
      const roundMatch = logMessage.match(/Round\s+(\d+)/)
      const accMatch = logMessage.match(/test_accuracy\s+([\d.]+)/)
      const lossMatch = logMessage.match(/test_loss\s+([\d.]+)/)

      if (roundMatch) {
        currentRound = parseInt(roundMatch[1], 10)
        pendingMetrics[currentRound] = pendingMetrics[currentRound] || {}
        pendingMetrics[currentRound].round = currentRound
      }

      if (accMatch && currentRound !== null) {
        if(pendingMetrics[currentRound]){
          pendingMetrics[currentRound].testAcc = parseFloat(accMatch[1])
        }
        
      }

      if (lossMatch && currentRound !== null) {
        if(pendingMetrics[currentRound]){
          pendingMetrics[currentRound].loss = parseFloat(lossMatch[1])
        }
      }

      if (
        pendingMetrics[currentRound]?.round !== undefined &&
        pendingMetrics[currentRound]?.testAcc !== undefined &&
        pendingMetrics[currentRound]?.loss !== undefined
      ) {
        dispatch(updateResults({ id, res: pendingMetrics[currentRound]}))
        delete pendingMetrics[currentRound]
      }

      setLogs(prev => [...prev, logMessage])
      setIsEmpty(false)
    }

    const handleStatus = ({ status }) => {
      if(status=='running'){
        dispatch(updateState({ id, key: 'trainning', value: true }))
      }
      else if(status=='finished'){
        dispatch(updateState({id,key:'trainning',value:false}))
      }
    }

    const handleConnect = () =>{
      dispatch(updateState({id,key:'connected',value:true}));
      messageApi.success(`任务 ${id} 已连接`);
    }

    const handleDisconnect = () => {
      dispatch(updateState({ id, key: 'connected', value: false }))
      messageApi.warning(`任务 ${id} 已断开`)
    }

    // 注册事件
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('log', handleLog)
    socket.on('status', handleStatus)

    // 清理事件监听器（⚠️非常重要）
    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('log', handleLog)
      socket.off('status', handleStatus)
    }
  }, [socket, id])

  useEffect(() => {
    const logContainer = logContainerRef.current
    if (!logContainer) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = logContainer
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5)
    }

    logContainer.addEventListener('scroll', handleScroll)
    return () => logContainer.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isAtBottom && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className='logswrapper'>
      {contextHolder}
      <div className='statuswrapper'>
        {item.status.connected ? <ConnectedTrue /> : <ConnectedFalse />}
        {item.status.trainning ? <TrainningTrue /> : <TrainningFalse />}
      </div>

      <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>训练日志</h3>
      {isempty ? (
        <Empty />
      ) : (
        <div ref={logContainerRef} className="logContent">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      )}
    </div>
  )
}