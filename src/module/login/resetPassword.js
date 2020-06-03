/*
 * @Author: cdluxy
 * @Desc: 重置密码（填写账号--设置新密码--完成）
 * @Date: 2020-05-23 12:24:25
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-31 23:49:09
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
import Step from '../../component/pureStep';
import style from './style.scss?module';

const layout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 20,
	},
};

const stepList = [{
	name: '填写账号'
}, {
	name: '设置新密码'
}, {
	name: '完成'
}];

const VerifyAccount = () => {
	const onceWaitTime = 120;	// 单次等待时间（秒）
	const history = useHistory();
	const [currentStep, setCurrentStep] = useState(0);
	const [sendBtnInfo, setSendBtnInfo] = useState(() => {
		// debugger;
		// 从本地存储中获取上次验证码发送时间来进行重新计算
		const localLastTime = localStorage.getItem('lastTime');
		if(localLastTime){
			const difference = Date.now() - Number(localLastTime);
			const isOverdue = difference >= onceWaitTime * 1000;
			if(isOverdue){
				return { canClick: true, waitSeconds: 0 };
			}else{
				return { canClick: false, waitSeconds: onceWaitTime - Math.round(difference / 1000) };
			}
		}else{
			return { canClick: true, waitSeconds: 0 };
		}
	});
	const [inputAccount, setInputAccount] = useState('');	// 输入的邮箱
	const [inputCode, setInputCode] = useState('');		// 输入的验证码
	const [seconds, setSeconds] = useState(5);
	const { canClick, waitSeconds } = sendBtnInfo;

	useEffect(() => {
		let timer = 0;
		if (waitSeconds > 0) {
			timer = setTimeout(() => {
				setSendBtnInfo({ canClick: false, waitSeconds: waitSeconds - 1 });
			}, 1000);
		} else {
			setSendBtnInfo({ canClick: true, waitSeconds: 0 });
		}
		return () => {
			clearTimeout(timer);
		};
	}, [waitSeconds]);

	const sendVerificationCode = () => {

		const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (inputAccount && inputAccount.match(reg)) {
			// 变更状态防止再点击
			setSendBtnInfo({ canClick: false, waitSeconds: 0 });

			// 调用接口，发送验证码
			console.log('调用发送验证码接口');
			sendPost('/send_code', { account: inputAccount });
			// 把当前时间记录到本地存储中，方便刷新页面能够知道之前验证码的发送时间
			localStorage.setItem('lastTime', Date.now());

			// 触发倒计时
			setSendBtnInfo({ canClick: false, waitSeconds: onceWaitTime });

		} else {
			message.warn('请先输入格式正确的邮箱账号地址');
		}

		// to do：调用申请账号接口
		// sendPost('/send_code', values).then((data) => {
		// 	// 申请成功，展示提示语
		// 	setIsEditOk(true);
		// });
	};

	const onValuesChange = (changedValues, allValues) => {
		setInputAccount(allValues.account);
	};

	const onFinish1 = values => {
		console.log('Received values of form: ', values);
		setInputCode(values.code);
		// 跳转到下一步
		setCurrentStep(1);
	};

	const onFinish2 = values => {
		console.log('Received values of form: ', values);

		const data = {
			account: inputAccount,
			code: inputCode,
			password: md5(values.password2)
		};

		//调用重设密码接口
		sendPost('/reset_password', data).then(() => {
			// 跳转到下一步
			setCurrentStep(2);
		});
		
	};

	useEffect(() => {
		if(currentStep === 2){
			let timer = 0;
			if(seconds > 0){
				timer = setTimeout(() => {
					setSeconds(seconds - 1);
				}, 1000);
			}else{
				// 跳回登录页
				history.push("/login");
			}
			return () => {
				clearTimeout(timer);
			};
		}
	}, [currentStep, seconds, history]);

	const arrStepJSX = [(<Form
			{...layout}
			name="step1"
			className={style["form-wrap"]}
			onValuesChange={onValuesChange}
			onFinish={onFinish1}
		>
			<Form.Item
				className={style["form-row"]}
				name="account"
				label="填写账号"
				rules={[
					{
						required: true,
						type: 'email',
						message: '请输入正确的邮箱地址',
					},
				]}
			>
				<div className={style["input-wrap"]}>
					<Input className={style["input"]} placeholder="请输入注册时使用的邮箱" />
				</div>
			</Form.Item>
			<Form.Item
				className={style["form-row"]}
				name="code"
				label="验证码"
				rules={[
					{
						required: true,
						message: '请输入验证码',
					},
				]}
			>
				<div className={style["input-wrap"]}>
					<Input className={style["input"]} placeholder="请输入验证码" />
					<Button onClick={() => sendVerificationCode()} className={classNames(style["btn-send"], canClick ? '' : style["btn-disabled"])} type="primary" htmlType="button" >{canClick ? '发送验证码' : `${waitSeconds}秒后重新发送`}</Button>
				</div>
			</Form.Item>

			<Form.Item className={style["form-btn-wrap"]}>
				<Button type="primary" htmlType="submit" className={style['form-btn']}>确定</Button>
			</Form.Item>
		</Form>),

		(<Form
			{...layout}
			name="step2"
			className={style["form-wrap"]}
			onFinish={onFinish2}
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
		</Form>),

		(<div className={style["content-area"]}>
			<div className={style["tip"]}>
				<div><i></i>设置成功！</div>
				<div>将在{`${seconds}秒后，自动返回登录页`}</div>
			</div>

			<Link to={'/login'}>
				<Button className={style['go-btn']} type="primary" htmlType="button" >返回登录页</Button>
			</Link>
		</div>)
	];

	return (
		<div className={style["reset-password"]}>

			<div className={style["step-area"]}>
				<Step stepList={stepList} activeStep={currentStep} />
			</div>

			{arrStepJSX[currentStep]}
		</div>
	);
};

export default VerifyAccount;