import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../redux/store';
import types from '../redux/types';

const { dispatch, getState } = store;
 
export async function getHeaders() {
	let userData = await AsyncStorage.getItem('userData');
	if (userData) {
		userData = JSON.parse(userData);
		//console.log(userData.accessToken, 'header')
		return {
			authorization: `${userData.token}`,
		};
	}
	return {};
}

function apiReq(url,data, method, headers, params){
	return new Promise((resolve,reject) => {
		axios({
			method: method,
			url: url,
			data: data,
			headers: headers,
			params: params,
		}).then(response => {
			
			const {data} = response;
			return resolve(data);

		}).catch(error =>{
			return reject(error);
		});
	})
}

export async function apiPost(endPoint, data, headers = {},params ='') {
	
	return await apiReq(endPoint, data, 'post', headers, params);
}

export async function apiDelete(endPoint, data, headers = {}, params ='') {
	return await apiReq(endPoint, data, 'delete', headers, params);
}

export async function apiGet(endPoint, data, headers = {}, params ='') {
	return await apiReq(endPoint, data, 'get', headers, params);
}

export async function apiPut(endPoint, data, headers = {}, params ='') {
	return await apiReq(endPoint, data, 'put', headers, params);
}

export function setItem(key, data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(key).then(data => {
			resolve(JSON.parse(data));
		});
	});
}

export function removeItem(key) {
	return AsyncStorage.removeItem(key);
}

export function clearAsyncStorate(key) {
	return AsyncStorage.clear();
}

export function setUserData(data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem('userData', data);
}

export async function getUserData() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('userData').then(data => {
			resolve(JSON.parse(data));
		});
	});
}
export async function clearUserData() {
	return AsyncStorage.removeItem('userData');
}
