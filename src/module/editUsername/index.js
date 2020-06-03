/*
 * @Author: cdluxy
 * @Desc: 修改用户名
 * @Date: 2020-05-23 22:50:54
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-28 01:45:51
 */

import React, {useState} from 'react';
import classNames from 'classnames';
import {
	useHistory
} from "react-router-dom";
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


const EditUsername = () => {
	
	const [isEditOk, setIsEditOk] = useState(false);
	const [{ userInfo }, dispatch ] = useLoginInfo();
	// const history = useHistory();

	const { session } = userInfo;

	const onFinish = values => {
		console.log('Received values of form: ', values);

		// 调用修改用户名接口
		sendPost('/change_name', values).then((data) => {
			dispatch({type: 'editUsername', username: values.name });
			message.success('修改成功');
			setIsEditOk(true);
		});
	};

	const [form] = Form.useForm();
	form.setFieldsValue(session);

	return (
		<div className={style["wrap"]}>
			{isEditOk? 
				<div className={style["ok-tip"]}><i></i>设置成功！</div>:
				<Form
					{...layout}
					className={style["form"]}
					form={form}
					name="normal_login"
					onFinish={onFinish}
				>
					<Form.Item
						className={style["form-row"]}
						name="name"
						label="用户名"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input className={style["input"]} placeholder="请输入新用户名" />
					</Form.Item>

					<Form.Item className={style["form-btn-wrap"]}>
						<Button type="primary" htmlType="submit" className={style['form-btn']}>确定</Button>
					</Form.Item>
				</Form>
			}
		</div>
	);
};

export default EditUsername;