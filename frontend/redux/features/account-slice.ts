import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountState {
  id: string,
  balance: number,
}

const initialState: AccountState = {
  id: '',
  balance: 0,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<{id : string}>) => {
      state.id = action.payload.id
    },
    clear: () => {
      return initialState
    },
    update: (state, action: PayloadAction<{balance: number}>) => {
      state.balance = action.payload.balance
    },
    deposit: (state, action: PayloadAction<number>) => {
      state.balance += action.payload
    },
    withdraw: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload
    }
  },
})


export const { create, clear, deposit, withdraw, update } = accountSlice.actions

export default accountSlice.reducer