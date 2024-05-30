import { combineReducers } from 'redux'

import authSlice from './slices/auth.slice'

export default combineReducers({
  auth: authSlice,
})
