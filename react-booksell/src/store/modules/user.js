//和用户相关的状态管理
import {createSlice} from '@reduxjs/toolkit'
import { request } from '@/utils'
import {setToken as _setToken , getToken,removeToken} from '@/utils'
import { loginAPI,getProfileAPI } from '@/apis/user'

const userStore = createSlice({
    name:"user",
    //数据状态
    initialState:{
        //先看本地有没有，没有的话就用空串
        // token:localStorage.getItem('token_key') || ''
        token:getToken() || '',
        userInfo:{}
    },
    //同步修改方法
    reducers:{
        setToken(state, action){
            //这是存在redux里面
            state.token = action.payload
            //在localstorage也存一份
            // localStorage.setItem('token_key',action.payload)
            _setToken(action.payload)
        },
        setUserInfo(state, action){
            state.userInfo = action.payload
        },
        clearUserInfo (state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

// 解构出actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions
// 获取reducer函数
const userReducer = userStore.reducer

//异步方法  完成登陆获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
    const res = await loginAPI(loginForm)
    dispatch(setToken(res.data.token))
        }
    }

    //获取个人信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
        }
    }


export { fetchLogin, fetchUserInfo , clearUserInfo ,setToken }
export default userReducer
