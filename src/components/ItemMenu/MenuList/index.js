import React from 'react'
import { useSelector } from 'react-redux'
import './index.css'
import { NavLink } from 'react-router-dom'
import HandleAdd from '../HandleAdd'
import { Dropdown } from 'antd'
import { useDispatch } from 'react-redux'
import { deleteItem, rename } from '../../../features/itemSlice'
import { useState } from 'react'

export default function MenuList() {
  const dispatch = useDispatch();
  const itemList = useSelector(state => state.items)
  const [editingId, setEditingId] = useState(null)
  const [newName, setNewName] = useState('')
  const handleMenuClick = (e, item) => {
    if (e.key === '1') {
      setEditingId(item.id)
      setNewName(item.name)
      dispatch(rename(item.id))
    } else if (e.key === '2') {
      dispatch(deleteItem(item.id))
    }
  }
  const handleRenameSubmit  = (id) => {
    if (newName.trim()) {
      dispatch(rename( {id, newName} )) // 假设你有这个 action
      setEditingId(null)
      setNewName('')
    }
  }
  return (
    <div className='MenuWrapper'>
      {
        itemList.length === 0 ? "没有任务" :
          itemList.map(item => {
            const menuProps = {
              items: [
                { label: '重命名', key: '1' },
                { label: '删除', key: '2' },
              ],
              onClick: (e) => handleMenuClick(e, item),
            }
            return (
              <Dropdown menu={menuProps} trigger={'contextMenu'}key={item.id}>
                {
                  editingId === item.id?(
                    <input
                    type="text"
                    value={newName}
                    autoFocus
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={() => handleRenameSubmit(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameSubmit(item.id)
                    }}
                    style={{ width: '100%' }}
                  />
                  ):(
                    <NavLink
                    to={`/item/${item.id}`}
                    style={{ display: 'block' }}
                    key={item.id}
                  >
                    {item.name}
                  </NavLink>
                  )
                }
               
              </Dropdown>
            )

          })
      }
      <HandleAdd />
    </div>
  )
}
