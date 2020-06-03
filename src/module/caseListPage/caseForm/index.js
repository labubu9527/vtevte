/*
 * @Author: cdluxy
 * @Desc: 案例弹框使用的表单
 * @Date: 2020-05-02 22:17:08
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-03 01:21:52
 */
import React from 'react';
import moment from 'moment';
import { Form, Input, Button, DatePicker } from 'antd';
import style from './style.scss?module';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const layout = {
	labelCol: {
		span: 5,
	},
	wrapperCol: {
		span: 18,
	},
};

function addBeginEndDate(inputObj){
	const {beginDate, endDate} = inputObj;
	inputObj.beginEndDate = [moment(beginDate, 'YYYY-MM-DD'), moment(endDate, 'YYYY-MM-DD')];
}

function removeBeginEndDate(inputObj){
	const {beginEndDate} = inputObj;
	inputObj.beginDate = beginEndDate[0].format('YYYY-MM-DD');
	inputObj.endDate = beginEndDate[1].format('YYYY-MM-DD');
	delete inputObj.beginEndDate;
	// inputObj.beginEndDate = [moment(beginDate, 'YYYY-MM-DD'), moment(endDate, 'YYYY-MM-DD')];
}

const CaseForm = ({modalCloseFun, addCallback, editCallback, editData}) => {
	
	const [form] = Form.useForm();

	const onFinish = values => {
		console.log('onFinish:', values);
		removeBeginEndDate(values);
		if(editData){
			editCallback(Object.assign(editData, values));
		}else{
			addCallback(Object.assign(values, {id: Date.now(), sampleSize: 0}));
		}
		modalCloseFun();
	};

	if(editData){
		addBeginEndDate(editData);
		form.setFieldsValue(editData);
	}else{
		form.resetFields();
	}

	return (
		<>
			<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
				<Form.Item
					name="name"
					label="案例名称"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="purpose"
					label="案例目的"
					rules={[
						{
							required: true,
						},
					]}
				>
					<TextArea rows={4} />
				</Form.Item>
				<Form.Item
					name="beginEndDate"
					label="起止时间"
					rules={[
						{
							required: true,
						},
					]}
				>
					<RangePicker style={{width: '100%'}} onChange={(dates, dateStrings) => {console.log('dates:', dates, ' dateStrings:', dateStrings)}} />
				</Form.Item>
				<Form.Item
					name="organization"
					label="主办机构"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="manager"
					label="研究负责人"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<div className={style["btn-area"]}>
					<Button htmlType="button" onClick={() => modalCloseFun()}>取消</Button>
					<Button type="primary" htmlType="submit">确定</Button>
				</div>
			</Form>
		</>
	);
};

export default CaseForm;