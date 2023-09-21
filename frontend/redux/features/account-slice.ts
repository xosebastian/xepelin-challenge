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
    transactions: (state, action: PayloadAction<{balance: number, type: string}>) => {
      if (action.payload.type === 'DEPOSIT') {
        state.balance += action.payload.balance
      }else if (action.payload.type === 'WITHDRAWAL') {
        state.balance -= action.payload.balance
      }
    },
  },
})


export const { create, clear, update, transactions } = accountSlice.actions

export default accountSlice.reducer