//和用户相关的状态管理
import {createSlice} from '@reduxjs/toolkit'
import { request } from '@/utils'

const userStore = createSlice({
    name:"user",
    //数据状态
    initialState:{
        //先看本地有没有，没有的话就用空串
        token:localStorage.getItem('token_key') || ''
    },
    //同步修改方法
    reducers:{
        setToken(state, action){
            //这是存在redux里面
            state.token = action.payload
            //在localstorage也存一份
            localStorage.setItem('token_key',action.payload)
        }
    }
})

// 解构出actionCreater
const { setToken } = userStore.actions
// 获取reducer函数
const userReducer = userStore.reducer

//异步方法  完成登陆获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    dispatch(setToken(res.data.token))
        }
    }


export { fetchLogin, setToken }
export default userReducer
