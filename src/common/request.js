/*
 * @Author: cdluxy
 * @Desc: 封装请求库
 * @Date: 2020-05-25 22:01:45
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-01 16:34:04
 */

import axios from 'axios';
import { message as tip } from 'antd';

const instance = axios.create({
	baseURL: 'http://model.rxthinking.com/cpms/api',
	timeout: 10000,
	transformResponse: [function (data) {
		// 透传响应数据到catch里
		return data;
	  }],
});

/**
 * 给请求url追加参数。适用于get请求
 * @param {*} url 	请求url
 * @param {*} data 	请求参数
 */
function completeUrl(url, data){
	return url + (url.includes('?')? '&': '?') + Object.keys(data).map(attr => attr + '=' + data[attr]).join('&');
}

function sendGet(url, data, config) {
	return commonHandle('get', completeUrl(url, data), null, config);
}

function sendPost(url, data, config) {
	return commonHandle('post', url, data, config);
}

function sendPatch(url, data, config) {
	return commonHandle('patch', url, data, config);
}

function translateToFormData(data){
	const formData = new FormData();
	for(let attr in data){
		formData.append(attr, data[attr]);
	}
	return formData;
}

function showLoading(){
	document.querySelector('#root > .ant-spin-spinning').style.display = 'flex';
}

function hideLoading(){
	document.querySelector('#root > .ant-spin-spinning').style.display = 'none';
}

function commonHandle(type, url, data, config = {isForm: false, isBlob: false}){

	// console.log(`${type} request url:`, url);

	const loginInfo = sessionStorage.getItem('loginInfo');
	let token = '';
	if(loginInfo){
		const data = JSON.parse(loginInfo);
		if(data){
			token = data.token;
		}
	}

	const {isForm, isBlob} = config;

	const requestArguments = {
		get: isBlob? [url, {responseType: "blob", headers: {'Authorization': token}}] : [url, {headers: {'Authorization': token}}],
		post: isForm? [url, translateToFormData(data), {headers: {'Authorization': token, 'Content-Type': 'multipart/form-data'}}] : [url, data, {headers: {'Authorization': token}}],
		patch: [url, data, {headers: {'Authorization': token}}]
	}

	showLoading();

	return new Promise((resolve, reject) => {
		instance[type](...requestArguments[type])
		.then(function (response) {

			hideLoading();

			// console.log(`request ${type} response:`, response);
			if(response.data){
				try{
					const isPDF = response.headers['content-type'] === 'application/pdf';
					if(isPDF){
						resolve(response.data);
					}else{
						const {code, data, message} = JSON.parse(response.data);
						if(String(code).charAt(0) === '2'){		// 只有2XX才算正常的响应
							// console.log('>>>> 请求成功：', data);
							resolve(data);
						}else{
							// console.log('>>>> 请求失败：', message);
							errorTip(message);
						}
					}
				}catch(e){
					// console.log('>>>> 请求失败：', e);
					reject();
					errorTip();
				}
			}else{
				reject();
				errorTip();
			}
		})
		.catch(function (error) {

			hideLoading();

			// console.log(`request ${type} error:`, error);
			const isBusinessError = [400,401,404].includes(error.response && error.response.status);	// 400 INVALID REQUEST, 用户请求错误   401 Unauthorized, 无权限, 如无令牌, 密码错误等
			if(isBusinessError){
				const {message} = JSON.parse(error.response.data);
				errorTip(message);
			}else{
				errorTip();
			}
		});
	});
}

function errorTip(msg){
	if(msg){
		tip.error(msg);
	}else{
		tip.error(`请求失败，请稍后再试`);
	}
}

export {
    sendGet,
	sendPost,
	sendPatch
};