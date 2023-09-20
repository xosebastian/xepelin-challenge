import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountState {
  id: string,
  accountName: string,
  accountNumber: string,
  balance: number,
}

const initialState: AccountState = {
  id: '',
  accountName: '',
  accountNumber: '',
  balance: 0,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<AccountState>) => {
      state.id = action.payload.id
      state.accountName = action.payload.accountName
      state.accountNumber = action.payload.accountNumber
      state.balance = action.payload.balance
    },
    clear: () => {
      return initialState
    },
    deposit: (state, action: PayloadAction<number>) => {
      state.balance += action.payload
    },
    withdraw: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload
    }
  },
})


export const { create } = accountSlice.actions

export default accountSlice.reducer