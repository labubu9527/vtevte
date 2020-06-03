/*
 * @Author: cdluxy
 * @Desc: 用户管理
 * @Date: 2020-05-24 10:32:17
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-03 23:28:15
 */

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Table, Input, Select, Form, Switch, message} from 'antd';
import { sendGet, sendPost, sendPatch } from 'rootSrc/common/request';
import style from './style.scss?module';

// const mockData = [{ "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "10001" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "10002" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "10003" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "10004" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "10005" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "10006" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "10007" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "10008" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "10009" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100010" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100011" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100012" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100013" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100014" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100015" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100016" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100017" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100018" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100019" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100020" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100021" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100022" }, { "account": "12345678@qq.com", "name": "张三", "status": 0, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100023" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "管理员", "role_description": "a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码；", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100024" }, { "account": "12345678@qq.com", "name": "张三", "status": 1, "role_name": "普通用户", "role_description": "仅可查看、编辑自己创建的项目。", "creator": "大数", "creation_datetime": "2020-05-24 11:05:51", "notes": "备注啊", "id": "100025" }];

const { Option } = Select;

const roleNameToDescMap = {
	'管理员': 'a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码',
	'普通用户': '仅可查看、编辑自己创建的项目'
}

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === 'select' ? (<Select defaultValue={record.role_name} style={{ width: 100 }} onChange={(value) => {
		const roleDescriptionDom = document.querySelector('.ant-select-focused').closest('td').nextSibling;
		roleDescriptionDom.innerText = roleNameToDescMap[value];
	}} >
		<Option value="管理员">管理员</Option>
		<Option value="普通用户">普通用户</Option>
	</Select>) : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: dataIndex === 'notes'? false: true,
							message: `请输入${title}`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
					children
				)}
		</td>
	);
};

const UserManagement = ({ tableDataSource = [] }) => {


	const [isAddMode, setIsAddMode] = useState(false);	// 是否是新增模式

	// 补全表格各种操作依赖的key字段
	// const initTableDataSource = tableDataSource.map(item => { return { id: item.id, ...item } });

	const [form] = Form.useForm();
	const [queryParams, setQueryParams] = useState({ page: 1, per_page: 10 });
	const [useTableDataSource, setUseTableDataSource] = useState([]);
	const [useTableDataTotal, setUseTableDataTotal] = useState(0);
	const [addBeforeTableDataSource, setAddBeforeTableDataSource] = useState([]);
	const [editingKey, setEditingKey] = useState('');

	// 加载用户列表数据
	useEffect(() => {
		sendGet('/users', queryParams).then(({data, total}) => {
			setUseTableDataTotal(total);
			setUseTableDataSource(data);
		});
	}, [queryParams]);

	const tableColumns = [
		{
			title: '编号',
			dataIndex: 'id',
			width: 120,
		},
		{
			title: '用户名',
			dataIndex: 'name',
			width: 120,
			editable: true,
		},
		{
			title: '邮箱地址',
			dataIndex: 'account',
			width: 170
		},
		{
			title: '角色名称',
			dataIndex: 'role_name',
			width: 100,
			editable: true,
		},
		{
			title: '角色说明',
			dataIndex: 'role_description',
			width: 250,
		},
		{
			title: '创建人',
			dataIndex: 'creator',
			width: 80
		},
		{
			title: '创建时间',
			dataIndex: 'creation_datetime',
			width: 116,
		},
		{
			title: '备注',
			dataIndex: 'notes',
			width: 100,
			editable: true,
		},
		{
			title: '操作',
			dataIndex: 'action',
			width: 160,
			render: (text, record) => {
				const editable = isEditing(record);
				const innerContent = editable ? (
					<>
						<button className={style["ope-btn"]} onClick={() => save(record.id)} >保存</button>
						<button className={style["ope-btn"]} onClick={() => cancel()} >取消</button>
					</>
				) : (
					<>
						<button disabled={editingKey !== ''} className={style["ope-btn"]} onClick={() => editRow(record)} >编辑</button>
						<Switch disabled={editingKey !== ''} className={style["ope-switch"]} checked={record.status === 1} onChange={(checked) => switchChange(record, checked)} />
					</>
				);

				return <div className={style["ope-wrap"]}>{innerContent}</div>;
			},
		}
	];

	if(isAddMode){
		const column = tableColumns.find(({dataIndex}) => dataIndex === 'account');
		column.editable = true;
	}

	const handleTableChange = (pagination, filters, sorter) => {
		const {current: page, pageSize: per_page} = pagination;
		const newParams = Object.assign({}, queryParams, {page, per_page});
		setQueryParams(newParams);
	}

	const isEditing = record => {
		return record.id === editingKey;
	};

	const addRow = () => {
		const newData = {
			id: '',
			role_name: '普通用户',	// 默认普通用户
			role_description: '仅可查看、编辑自己创建的项目',
		};

		// 重置表单输入项
		form.setFieldsValue({
			name: '',	// 新建用户默认启用
			account: '',
			notes: '',
			...newData
		});

		setEditingKey('');
		setIsAddMode(true);
		setAddBeforeTableDataSource(useTableDataSource);	// 记录住进行添加操作之前的表格数据
		setUseTableDataSource([newData]);
	};

	const editRow = record => {
		form.setFieldsValue({
			...record,
		});
		setAddBeforeTableDataSource(useTableDataSource);	// 记录住进行编辑操作之前的表格数据
		setEditingKey(record.id);
	};

	const cancel = () => {
		const editItem = addBeforeTableDataSource.find(({id}) => id === editingKey);
		setEditingKey('');
		setIsAddMode(false);
		if(editItem){
			// 由于角色描述不是编辑表单元素，所以单独通过操作dom来重置回原来的值
			document.querySelector('.ant-select-single').closest('td').nextSibling.innerText = editItem.role_description;
		}
		setUseTableDataSource(addBeforeTableDataSource);	// 恢复到进行添加操作之前的数据
	};

	/**
	 * 启用、停用用户
	 * @param {*} id 	用户id
	 * @param {*} checked 	是否启用
	 */
	const switchChange = ({id}, checked) => {
		const newData = [...useTableDataSource];
		const index = newData.findIndex(item => id === item.id);
		const editItem = {...useTableDataSource[index]};
		editItem.status = checked? 1: 0;
		newData.splice(index, 1, editItem);

		const {id: userId, name, status} = editItem;

		// 调用接口更新用户状态
		sendPost(`/users/${userId}/status`, { id: userId, status }).then((data) => {
			message.success(status === 0? `已停用 ${name} 账户`: `已启用 ${name} 账户`);
			setUseTableDataSource(newData);
		});
	}

	/**
	 * 同步角色说明
	 * 管理员 => a.可查看并编辑所有系统中存在的项目；b. 可创建、编辑、删除用户账号，修改用户密码
	 * 普通用户 => 仅可查看、编辑自己创建的项目
	 */
	const syncRoleDesc = (rowData) => {
		const {role_name} = rowData;
		rowData.role_description = roleNameToDescMap[role_name];
		return rowData;
	}

	const save = async id => {
		try {
			const row = await form.validateFields();
			const newData = [...useTableDataSource];
			const index = newData.findIndex(item => id !== '' && id === item.id);

			if (index > -1) {
				// 编辑记录
				console.log('编辑记录~');
				
				const item = newData[index];
				const saveItem = syncRoleDesc({ ...item, ...row });
				const {id, name, role_name, notes} = saveItem;

				// 调用编辑接口保存
				sendPatch(`/users/${id}`, {id, name, role_name, notes}).then((data) => {
					message.success('修改成功');
					// const newList = [...addBeforeTableDataSource];
					// newList.unshift(data);
					// setIsAddMode(false);
					// setUseTableDataSource(newList);

					// newData.splice(index, 1, data);	// 使用接口返回的新数据目前有点问题，改为直接使用本地编辑后的数据
					newData.splice(index, 1, saveItem);
					setUseTableDataSource(newData);
					setAddBeforeTableDataSource(newData);	// 编辑保存完后要同步到addBeforeTableDataSource中
					setEditingKey('');
				});

			} else {
				// 新增记录
				console.log('新增记录~', row);

				const {role_description, ...data} = row;

				// 调用新增用户接口，使用返回的记录来刷新 setUseTableDataSource
				sendPost(`/users`, data).then((data) => {
					message.success('新增成功');

					// 新增操作后重新请求加载列表数据
					setIsAddMode(false);
					const newParams = Object.assign({}, queryParams);
					setQueryParams(newParams);
				});
				
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const mergedColumns = tableColumns.map(col => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: record => {
				return {
					record,
					inputType: col.dataIndex === 'role_name' ? 'select' : 'text',
					// inputType: 'text',
					dataIndex: col.dataIndex,
					title: col.title,
					editing: isEditing(record),
				};
			},
		};
	});

	return (
		<div className={style['wrap']}>
			<button className={classNames(style["add-btn"], isAddMode? style['btn-disabled']: '') } onClick={() => addRow()} >新增用户</button>
			<div className={style["table-wrap"]}>
				<Form form={form} component={false}>
					<Table
						className={style['table']}
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						bordered
						dataSource={useTableDataSource}
						columns={mergedColumns}
						rowClassName="editable-row"
						onChange={handleTableChange}
						pagination={{
							position: ['bottomCenter'], 
							total: useTableDataTotal,
							showSizeChanger: true,
							showQuickJumper: true,
							showTotal: total => `共 ${useTableDataTotal} 条数据`
						}}
					/>
				</Form>
			</div>
		</div>
	);
}

export default UserManagement;