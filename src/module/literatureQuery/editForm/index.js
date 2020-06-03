/*
 * @Author: cdluxy
 * @Desc: 编辑论文弹框使用的表单
 * @Date: 2020-05-17 22:53:31
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-28 22:09:40
 */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { sendPost } from 'rootSrc/common/request';
import style from './style.scss?module';

const { TextArea } = Input;

const layout = {
	labelCol: {
		span: 5,
	},
	wrapperCol: {
		span: 18,
	},
};

const EditForm = ({modalCloseFun, formData, callback}) => {
	console.log('formData:', formData);
	const [form] = Form.useForm();

	const onFinish = values => {
		
		console.log('onFinish:', values);

		const data = {id: formData.id, tags: values.tags};
		// 调用接口更新论文（目前只能修改论文标签）
		sendPost(`/data_overview/tags`, data).then((data) => {
			message.success('修改成功');
			
			callback({id: formData.id, ...values});
			modalCloseFun();
		});
		
	};

	form.setFieldsValue(formData);

	return (
		<>
			<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
				<Form.Item
					name="name"
					label="论文名称"
					rules={[
						{
							required: true,
						},
					]}
				>
					<span>{formData.name}</span>
				</Form.Item>
				<Form.Item
					name="tags"
					label="标签"
					// rules={[
					// 	{
					// 		required: true,
					// 	},
					// ]}
				>
					<TextArea rows={4}/>
				</Form.Item>
				<div className={style["btn-area"]}>
					<Button htmlType="button" onClick={() => modalCloseFun()}>取消</Button>
					<Button type="primary" htmlType="submit">确定</Button>
				</div>
			</Form>
		</>
	);
};

export default EditForm;