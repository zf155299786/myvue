import Vue from "vue"
import axios from "axios"
import api from "@/api"

axios.defaults.baseURL = 'https://cnodejs.org';
//获取主题列表
export function Topics(page,tab){  
	return axios.get(api.topics,{
		params:{
			tab, //分类
			page //当前页码
		}
	})
}
//获取主题详情
export function TopicDetail(id,params){
	return axios.get(api.topicDetail+id,params)
}

//登录
export function login(params){
	return axios.post(api.login,params)
}

//获取用户详情
export function user(id){
	return axios.get(api.user+id);
}

  //设置本地存储
export function setStorage(key,value){
	sessionStorage.setItem(key,JSON.stringify(value))
}
	//获取本地存储
export function getStorage(key){
	return JSON.parse(sessionStorage.getItem(key));
}