/*
 * @Author: cdluxy
 * @Desc: 登录表单
 * @Date: 2020-05-22 22:27:11
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-28 01:57:58
 */

import React from 'react';
import {
	Link,
	useHistory
} from "react-router-dom";
import md5 from 'md5';
import { Form, Input, Button } from 'antd';
import { sendPost } from 'rootSrc/common/request';
import { useLoginInfo } from '../../hooks/loginInfo';
import style from './style.scss?module';

const LoginForm = () => {
	
	const [, dispatch] = useLoginInfo();
	const history = useHistory();

	const onFinish = values => {
		console.log('Received values of form: ', values);

		const { account, password } = values;
		const usePassword = md5(password);

		// to do：调用登录接口
		sendPost('/login', { account, password: usePassword }).then((data) => {
			// 登录成功
			console.log('登录响应数据：', data);
			dispatch({type: 'login', data: {p: usePassword, ...data}});
			// 跳转到主界面
			history.push("/main");
		});
	};

	return (
		<div className={style["login-form-wrap"]}>

			<div className={style["content-logo"]}></div>

			<Form
				name="normal_login"
				className="login-form"
				onFinish={onFinish}
			>
				<Form.Item
					className={style["username"]}
					name="account"
					rules={[
						{
							required: true,
							type: 'email',
							message: '请输入正确的邮箱地址',
						},
					]}
				>
					<Input className={style["input"]} placeholder="请输入注册时使用的邮箱" />
				</Form.Item>
				<Form.Item
					className={style["password"]}
					name="password"
					rules={[
						{
							required: true,
							message: '请输入密码',
						},
					]}
				>
					<Input
						className={style["input"]}
						type="password"
						placeholder="请输入密码"
					/>
				</Form.Item>
				<Form.Item>
					<div className={style["helper"]}>
						<Link to={'/contact'}><span>开通账号</span></Link>
						<Link to={'/resetPassword'}><span>忘记密码？</span></Link>
					</div>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className={style['form-btn']}>登录</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginForm;