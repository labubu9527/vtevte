/*
 * @Author: cdluxy
 * @Desc: 文献查询
 * @Date: 2020-05-17 17:31:35
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-10 00:30:30
 */ 

import React, {useState, useEffect, useRef} from 'react';
import { Table, Modal } from 'antd';
import { sendGet } from 'rootSrc/common/request';
import AddForm from './addForm';
import EditForm from './editForm';
import ViewForm from './viewForm';
import style from './style.scss?module';

const arrLink = [
	{img: require('./icons/GoogleScholar.png'), name: 'Google Scholar', link: 'https://scholar.google.com/'}, 
	{img: require('./icons/PubMed.png'), name: 'PubMed', link: 'https://pubmed.ncbi.nlm.nih.gov/'}, 
	{img: require('./icons/WebofScience.png'), name: 'Web of Science', link: 'http://login.webofknowledge.com/error/Error?Error=IPError&PathInfo=%2F&RouterURL=http%3A%2F%2Fwww.webofknowledge.com%2F&Domain=.webofknowledge.com&Src=IP&Alias=WOK5'}, 
	{img: require('./icons/SpringerLink.png'), name: 'Springer Link', link: 'https://link.springer.com/'}, 
	{img: require('./icons/WileyOnlineLibrary.png'), name: 'Wiley Online Library', link: 'https://onlinelibrary.wiley.com/'}, 
	{img: require('./icons/ScienceDirect.png'), name: 'ScienceDirect', link: 'https://www.sciencedirect.com/'}, 
	{img: require('./icons/EngineeringVillage.png'), name: 'Engineering Village', link: 'https://www.engineeringvillage.com/home.url'}, 
	{img: require('./icons/SAGE.png'), name: 'SAGE', link: 'https://journals.sagepub.com/'}, 
	{img: require('./icons/SciELO.png'), name: 'SciELO', link: 'https://www.scielo.br/'}, 
];

// id: str, 论文编号
// - name: str, 论文名称
// - tags: str, 个人标签
// - uid: str, 上传者 uid
// - upload_datetime: str, 上传时间

/* const mockData = [{
	id: '10001',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
}, {
	id: '10002',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10003',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10004',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10005',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10006',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10007',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10008',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10009',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10010',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10011',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},{
	id: '10012',
	name: 'XXXXXX研究',
	tags: 'XXXXXX标签',
	upload_datetime: '2020-05-17'
},]; */

const LiteratureQuery = () => {

	const [addVisible, setAddVisible] = useState(false);
	const [editVisible, setEditVisible] = useState(false);
	const [viewVisible, setViewVisible] = useState(false);
	const [queryParams, setQueryParams] = useState({ name: '', sort: 0, page: 1, per_page: 10 });
	const [useTableDataSource, setUseTableDataSource] = useState([]);
	const [useTableDataTotal, setUseTableDataTotal] = useState(0);
	const [editItem, setEditItem] = useState({});
	const inputEl = useRef(null);

	// 查询论文列表数据
	useEffect(() => {
		sendGet('/data_overview/literatures', queryParams).then(({data, total}) => {
			const {page, per_page} = queryParams;
			setUseTableDataTotal(total);
			// 增加行表格行id，纯粹用于展示
			setUseTableDataSource(data.map((item, index) => ({rowNumber: (page - 1) * per_page + index + 1, ...item})));
		});
	}, [queryParams]);

	const handleTableChange = (pagination, filters, sorter) => {
		const mapOrder = {
			ascend: 1,
			descend: -1,
		};
		const {current: page, pageSize: per_page} = pagination;
		const {order} = sorter;
		const newParams = Object.assign({}, queryParams, {page, per_page, sort: mapOrder[order] || 0});
		setQueryParams(newParams);
	}
	
	const closeModal = () => {
		setAddVisible(false);
		setEditVisible(false);
		setViewVisible(false);
	};

	const addCallback = (formData) => {
		// 新增操作后重新请求加载列表数据
		const newParams = Object.assign({}, queryParams);
		setQueryParams(newParams);
	};

	const editCallback = (formData) => {
		const {id: editId, tags} = formData;
		const editIndex = useTableDataSource.findIndex(({id}) => id === editId);
		const newItem = {...useTableDataSource[editIndex], tags};
		const newList = [...useTableDataSource];
		newList.splice(editIndex, 1, newItem);
		setUseTableDataSource(newList);
	};

	const search = () => {
		const newParams = Object.assign({}, queryParams, {name: inputEl.current.value});
		setQueryParams(newParams);
	};

	const tableColumns = [
		{
			title: '论文编号',
			// dataIndex: 'id',
			dataIndex: 'rowNumber',
			width: 90,
		},
		{
			title: '论文名称',
			dataIndex: 'name',
			width: 350,
		},
		{
			title: '标签',
			dataIndex: 'tags',
			width: 200,
		},
		{
			title: '上传时间',
			dataIndex: 'creation_datetime',
			sorter: true,
			width: 150,
		},
		{
			title: '操作',
			dataIndex: 'action',
			width: 150,
			render: (text, record) => (
				  <div className={style["ope-wrap"]}>
					<span className={style["ope-view"]}  onClick={() => {
						setEditItem(record);
						setViewVisible(true);
					}} >查看全文</span><i></i><span className={style["ope-edit"]} onClick={() => {
						setEditItem(record);
						setEditVisible(true);
					}} >编辑标签</span>
				</div>
			),
		}
	];

	return (
		<>
			<div className={style['wrap']}>
				<div className={style["up"]}>
					<div className={style["search-bar"]}>
						<button className={style["upload"]} type="button" onClick={() => {
										setAddVisible(true);
									}}><i></i>本地上传</button>
						<button className={style["search-go"]} type="button" onClick={search}>搜索</button>
						<input ref={inputEl} type="text" className={style["keyword"]} placeholder="请输入论文名称"/>
					</div>
					<div className={style["table-wrap"]}>
						<Table columns={tableColumns} dataSource={useTableDataSource} onChange={handleTableChange} pagination={{
							position: ['bottomCenter'], 
							total: useTableDataTotal,
							showSizeChanger: true,
							showQuickJumper: true,
							showTotal: total => `共 ${useTableDataTotal} 条数据`
						}} />
					</div>
				</div>
				<div className={style["down"]}>
					<div className={style["title"]}>网站导航</div>
					<div className={style["link-wrap"]}>
						{arrLink.map(({img, name, link}, index) => <a key={index} href={link} target="_blank"><span><img src={img} alt=""/></span><span>{name}</span></a> )}
					</div>
				</div>
			</div>
			{addVisible && <Modal
				title="本地上传"
				visible={true}
				cancelText="取消"
				okText="确定"
				width={554}
				footer={null}
				keyboard={false}
				maskClosable={false}
				onCancel={closeModal}
				>
				<AddForm modalCloseFun={closeModal} callback={addCallback}/>
			</Modal>}
			{editVisible && <Modal
				title="编辑标签"
				visible={true}
				cancelText="取消"
				okText="确定"
				width={554}
				footer={null}
				keyboard={false}
				maskClosable={false}
				onCancel={closeModal}
				>
				<EditForm modalCloseFun={closeModal} formData={editItem} callback={editCallback}/>
			</Modal>}
			{viewVisible && <Modal
				title="查看全文"
				className={style['fullscreen']}
				visible={true}
				cancelText="取消"
				okText="确定"
				footer={null}
				keyboard={false}
				maskClosable={false}
				onCancel={closeModal}
				>
				<ViewForm modalCloseFun={closeModal} formData={editItem}/>
			</Modal>}
		</>
	);
}

export default LiteratureQuery;