/*
 * @Author: cdluxy
 * @Desc: 新增（上传）论文弹框使用的表单
 * @Date: 2020-05-17 22:53:31
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-05 22:27:10
 */
import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
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

const AddForm = ({modalCloseFun, callback}) => {
	
	const [form] = Form.useForm();

	const onFinish = values => {
		// console.log('onFinish:', values);
		const {tags} = values;
		if(tags === undefined){
			values.tags = '';
		}
		// 调用上传论文接口
		sendPost(`/data_overview/literatures`, values, {isForm: true}).then((data) => {
			message.success('上传成功');
			callback(values);
			modalCloseFun();
		});
	};

	// 设置如何将 event 的值转换成表单的字段值
	const normFile = e => {
		// name: str, 论文名称
		// - tags: str, 个人注释
		// - pdf: binary, pdf 文件
		return e.file;
	  };

	const onChange = e => {
		document.getElementById('uploadInputTip').setAttribute('data-content', e && e.file && e.file.name || '');
	}
	  
	return (
		<>
			<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
				<Form.Item
					name="name"
					label="论文名称"
					rules={[
						{
							required: true,
							max: 100
						},
					]}
				>
					<Input placeholder="请输入论文名称" />
				</Form.Item>

				<Form.Item
					name="pdf"
					label="上传论文"
					rules={[
						{
							required: true,
						},
					]}
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<Upload accept=".pdf" name="logo2" beforeUpload={ _ => false} listType="picture" showUploadList={false} onChange={onChange}>
						<Button id="uploadInputTip" className={style["upload-input"]}>
							{/* <Input /> */}
							<input type="text" style={{display: 'none'}}/>
						</Button>
					</Upload>
				</Form.Item>

				<Form.Item
					name="tags"
					label="标签"
					rules={[
						{
							// required: true,
							max: 100
						},
					]}
				>
					<TextArea rows={4} />
				</Form.Item>
				<div className={style["btn-area"]}>
					<Button htmlType="button" onClick={() => modalCloseFun()}>取消</Button>
					<Button type="primary" htmlType="submit">确定</Button>
				</div>
			</Form>
		</>
	);
};

export default AddForm;