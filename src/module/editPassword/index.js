/*
 * @Author: cdluxy
 * @Desc: 修改密码
 * @Date: 2020-05-23 23:35:51
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-28 02:08:15
 */

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
	Link,
	useHistory
} from "react-router-dom";
import md5 from 'md5';
import { Form, Input, Button, message } from 'antd';
import { sendPost } from 'rootSrc/common/request';
import { useLoginInfo } from '../../hooks/loginInfo';
import style from './style.scss?module';

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 18,
	},
};

const EditPassword = () => {
	
	const [isEditOk, setIsEditOk] = useState(false);
	const [{ userInfo }, dispatch] = useLoginInfo();
	const history = useHistory();

	const [seconds, setSeconds] = useState(5);

	useEffect(() => {
		let timer = 0;
		if(isEditOk){
			if(seconds > 0){
				timer = setTimeout(() => {
					setSeconds(seconds - 1);
				}, 1000);
			}else{
				// 修改密码后需要自动登出
				dispatch({type: 'logout'});
				// 跳转到登录页
				history.push("/login");
			}
		}
		return () => {
			clearTimeout(timer);
		};
	}, [isEditOk, seconds, history, dispatch]);

	const onFinish = values => {
		console.log('Received values of form: ', values);

		const {p: password} = userInfo;

		// 调用修改密码接口
		sendPost('/change_password', { old_password: password, new_password: md5(values.password2) }).then((data) => {
			message.success('设置成功');
			setIsEditOk(true);
		});

	};

	const logout = () => {
		// 修改密码后需要自动登出
		dispatch({type: 'logout'});
		// 跳转到登录页
		history.push("/login");
	};

	return (
		<div className={style["wrap"]}>
			{isEditOk? 
				<>
					<div className={style["tip"]}>
						<div><i></i>设置成功！</div>
						<div>将在{`${seconds}秒后，自动返回登录页`}</div>
					</div>
					<Button className={style['go-btn']} type="primary" htmlType="button" onClick={() => logout()} >返回登录页</Button>	
				</>:
				<Form
					{...layout}
					name="normal_login"
					className={style["form"]}
					onFinish={onFinish}
				>
					<Form.Item
						className={style["form-row"]}
						name="password"
						label="输入新密码"
						rules={[
							{
								required: true,
								pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
								message: '密码不符合要求，请重新编辑',
							},
						]}
					>
						<Input className={style["input"]} type="password" placeholder="8-16位数字字母组合" />
					</Form.Item>
					<Form.Item
						className={style["form-row"]}
						name="password2"
						label="确认新密码"
						rules={[
							{
								required: true,
								pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
								message: '密码确认不符合要求，请重新编辑',
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject('密码确认与上次输入不一致，请重新输入');
								},
							}),
						]}
					>
						<Input className={style["input"]} type="password" placeholder="8-16位数字字母组合" />
					</Form.Item>

					<Form.Item className={style["form-btn-wrap"]}>
						<Button type="primary" htmlType="submit" className={style['form-btn']}>提交</Button>
					</Form.Item>
				</Form>
			}
		</div>
	);
};

export default EditPassword;