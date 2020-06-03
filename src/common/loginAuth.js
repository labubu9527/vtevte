/*
 * @Author: cdluxy
 * @Desc: 登录校验
 * @Date: 2020-05-27 00:00:26
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-27 00:16:19
 */
import React from 'react';
import {
	Route,
	Redirect
} from "react-router-dom";
import { useLoginInfo } from '../hooks/loginInfo';

function LoginAuth({ children, ...rest }) {
	
	const [ info ] = useLoginInfo();
	const { hasLogin } = info;

	// console.log('---- LoginAuth hasLogin?', hasLogin);
	
	return (
		<Route
			{...rest}
			render={({ location }) =>
				hasLogin ? (
					children
				) : (
						<Redirect
							to={{
								pathname: "/login",
								state: { from: location }
							}}
						/>
					)
			}
		/>
	);
}

export default LoginAuth;