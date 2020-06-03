/*
 * @Author: cdluxy
 * @Desc: 登录用户信息hook
 * @Date: 2020-05-23 11:02:16
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-28 01:44:14
 */
import React, { useContext, useReducer } from 'react';

const LoginInfoContext = React.createContext();
/* const initLoginInfo = {
	hasLogin: false,
	userInfo: {
		token: '', 	// 用于验证的 token
        session: {
			id: '', 	// 用户编号
			name: '', 	// 用户昵称
			account: '', // 邮箱
		}
	}
}; */

const localStoreLoginInfo = sessionStorage.getItem('loginInfo');
const initLoginInfo = {
	hasLogin: localStoreLoginInfo? true: false,
	userInfo: localStoreLoginInfo? JSON.parse(localStoreLoginInfo): {}
};

function persistenceToLocalStore(data){
	sessionStorage.setItem('loginInfo', JSON.stringify(data));
}

function clearLocalStore(){
	sessionStorage.clear('loginInfo');
}

export const loginInfoReducer = (state, action) => {
	const {type, data, username} = action;
	switch (type) {
		case 'login': persistenceToLocalStore(data); return {hasLogin: true, userInfo: data};
		case 'logout': clearLocalStore(); return {hasLogin: false, userInfo: {}};
		case 'editUsername': {
			const userInfo = Object.assign({}, state.userInfo);
			userInfo.session.user_name = username;
			persistenceToLocalStore(userInfo);
			return {hasLogin: true, userInfo };
		};
		default: throw new Error('Unexpected action');
	}
};

export const LoginInfoProvider = ({ children }) => {
	const contextValue = useReducer(loginInfoReducer, initLoginInfo);
	return (
		<LoginInfoContext.Provider value={contextValue}>
			{children}
		</LoginInfoContext.Provider>
	);
};

export const useLoginInfo = () => {
	const contextValue = useContext(LoginInfoContext);
	return contextValue;
};
