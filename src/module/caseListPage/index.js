/*
 * @Author: cdluxy
 * @Desc: 实验项目列表页
 * @Date: 2020-05-02 10:17:46
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-23 14:06:58
 */

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Modal } from 'antd';
import CaseForm from './caseForm';
import SectionHead from 'rootSrc/component/sectionHead';
import mockData from '../../mockData/caseList';
import style from './style.scss?module';


const CaseListPage = () => {

	const list = mockData;

	const [modalTitle, setModalTitle] = useState('');
	const [visible, setVisible] = useState(false);
	const [editIndex, setEditIndex] = useState(-1);
	const [caseList, setCaseList] = useState(list);

	const closeModal = () => {
		setVisible(false);
	};
	
	const addCase = (newItem) => {
		caseList.push(newItem);
		setCaseList(caseList);
	};

	const editCase = (editItem) => {
		const {id: editId} = editItem;
		const objectIndex = caseList.findIndex(({id}) => id === editId);
		caseList[objectIndex] = editItem;
		setCaseList(caseList);
	};

	return (
		<div className={style['wrap']}>
			<SectionHead style={{marginLeft: '24px'}}>实验项目</SectionHead>
			<div className={style["search-bar"]}>
				<input type="text" placeholder="输入关键词，搜索相关案例"/><button type="button">搜索</button>
			</div>
			<ul className={style["list"]}>
				<li className={style["new"]} onClick={() => {
										setEditIndex(-1);
										setModalTitle('新增案例');
										setVisible(true);
									}}></li>
				{caseList.map(({id, name, organization, manager, sampleSize}, index) => {
					const orgAndManager = `${organization}（${manager}）`;
					return (
						<li key={id}>
							<div className={style["edit-item"]} onClick={() => {
										setEditIndex(index);
										setModalTitle('修改案例');
										setVisible(true);
									}}></div>
							<img className={style["icon"]} src={require('./icons/icon.png')} alt=""/>
							<div className={style["name"]} title={name}>{name}</div>
							<div className={style["org"]} title={orgAndManager}><span>{orgAndManager}</span></div>
							<div className={style["bottom"]}>
								<div className={style["total"]}>
									<div className={style["text"]}>样本量</div>
									<div className={style["number"]}>{String(sampleSize).replace(/\B(?=(\d{3})+$)/g,',')}</div>
								</div>
								<div className={style["edit-detail"]}>
									<Link to={`/main/caseDetail/${id}`}><button type="button" >修改方案</button></Link>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
			<Modal
				title={modalTitle}
				visible={visible}
				cancelText="取消"
				okText="确定"
				footer={null}
				maskClosable={false}
				onCancel={closeModal}
				>
				<CaseForm modalCloseFun={closeModal} addCallback={addCase} editCallback={editCase} editData={caseList[editIndex]} />
			</Modal>
		</div>
	);
}

export default CaseListPage;