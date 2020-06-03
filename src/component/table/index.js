/*
 * @Author: cdluxy
 * @Desc: 表格组件
 * @Date: 2020-05-04 20:57:07
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-17 22:47:59
 */

import React from 'react';
import classNames from 'classnames';
import { Table } from 'antd';
import sheetStyle from './style.scss?module';

// const columns1 = [
//   {
//     title: '患者ID',
//     dataIndex: 'name',
//     // key: 'name',
//   },
//   {
//     title: '姓名',
//     dataIndex: 'age',
//     // key: 'age',
//   },
// ];

const opeColumn = 
	{
	  title: '操作',
	  key: 'action',
	  width: 100,
	  render: (text, record) => (
		<span className={sheetStyle["ope-link"]}>查看详情</span>
	  ),
	};

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const VteTable = ({style, columns = [], dataSource}) => {
	return <Table style={style} columns={[...columns, opeColumn]} dataSource={dataSource} pagination={{ position: ['bottomCenter'] }} />;
}

export default VteTable;