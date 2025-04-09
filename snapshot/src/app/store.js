import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import itemReducer from '../features/itemSlice'
export const store = configureStore({
  reducer:{
    items:itemReducer,
  },
})
