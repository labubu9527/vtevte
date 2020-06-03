/*
 * @Author: cdluxy
 * @Desc: 开通账号
 * @Date: 2020-05-23 12:24:25
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-27 22:17:53
 */

import React, { useState } from 'react';
import {
	useHistory
} from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
import { sendPost } from 'rootSrc/common/request';
import style from './style.scss?module';

const layout = {
	labelCol: {
		span: 3,
	},
	wrapperCol: {
		span: 21,
	},
};

const OpenAccount = () => {
	
	const [isEditOk, setIsEditOk] = useState(false);
	// const history = useHistory();

	const onFinish = values => {
		console.log('Received values of form: ', values);

		// to do：调用申请账号接口
		sendPost('/apply_account', values).then((data) => {
			// 申请成功，展示提示语
			setIsEditOk(true);
		});

		// message.success('提交成功');
		// 跳转到登录页
		// history.push("/");
	};

	return (
		<div className={style["open-account"]}>

			{isEditOk? 
				<>
					<div className={style["title2"]}></div>
					<div className={style["tip"]}>
						<div><i></i>提交成功！</div>
						<div>请及时关注邮件动态，感谢您的配合！</div>
					</div>
				</>:
				<>
					<div className={style["title"]}></div>
					<Form
						{...layout}
						name="normal_login"
						className={style["form-wrap"]}
						onFinish={onFinish}
					>
						<Form.Item
							className={style["form-row"]}
							name="account"
							label="邮箱"
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
							className={style["form-row"]}
							name="name"
							label="姓名"
							rules={[
								{
									required: true,
									message: '请输入姓名',
								},
							]}
						>
							<Input className={style["input"]} placeholder="请输入姓名" />
						</Form.Item>
						<Form.Item
							className={style["form-row"]}
							name="unit"
							label="工作单位"
						>
							<Input className={style["input"]} placeholder="请输入工作单位" />
						</Form.Item>

						<Form.Item className={style["form-btn-wrap"]}>
							<Button type="primary" htmlType="submit" className={style['form-btn']}>提交</Button>
						</Form.Item>
					</Form>
				</>
			}

		</div>
	);
};

export default OpenAccount;