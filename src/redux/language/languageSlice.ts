import {createSlice} from '@reduxjs/toolkit'
import i18n from "i18next"

export interface LanguageState {
  language:'en'|'zh'
  languageList:{name:string,code:string}[]
}


const initialState:LanguageState={
  language:'zh',
  languageList:[
    {name:'中文',code:'zh'},
    {name:'English',code:'en'}
  ]
}


// interface ChangeLanguageAction {
//   type: string
//   payload: "zh" | "en"
// }



const languageSlice = createSlice({
  name:'language',
  initialState,
  reducers:{
    changeLanguage(state,action){
      i18n.changeLanguage(action.payload)
      state.language=action.payload
    }
  }
})

export const {reducer: languageReducer}=languageSlice
export const {changeLanguage}=languageSlice.actions