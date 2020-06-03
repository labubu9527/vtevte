/*
 * @Author: cdluxy
 * @Desc: 查看论文弹框使用的表单
 * @Date: 2020-05-17 22:53:31
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-30 15:19:50
 */
import React, { useState, useEffect } from 'react';
import { sendGet } from 'rootSrc/common/request';
import style from './style.scss?module';

// import PDFJS from 'pdfjs-dist';

// PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';


const ViewForm = ({modalCloseFun, formData}) => {
	console.log('formData:', formData);

	const [pdfAddress, setPdfAddress] = useState('');

	// 查询论文列表数据
	useEffect(() => {
		const {id} = formData;
		sendGet(`/data_overview/literatures/${id}`, { id }, {isBlob: true}).then((data) => {

			const binaryData = [];

			binaryData.push(data);
			
			// const blobUrl = window.URL.createObjectURL(new Blob(binaryData, {type:"application/zip"}));
			const blobUrl = window.URL.createObjectURL(new Blob(binaryData, {type:"application/pdf;chartset=utf-8"}));


			setPdfAddress(blobUrl);
		});
	}, []);

	/* setTimeout(() => {
		var url = './demo.pdf';
		PDFJS.getDocument(url).then((pdf) => {
			return pdf.getPage(1);
		}).then((page) => {
			// 设置展示比例
			var scale = 1.5;
			// 获取pdf尺寸
			var viewport = page.getViewport(scale);
			// 获取需要渲染的元素
			var canvas = document.getElementById('pdf-canvas');
			var context = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;
			
			var renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			
			page.render(renderContext);
		});
	}, 100);
 */
	const {name} = formData;

	return (
		<div className={style["wrap"]}>
			<a className={style["download"]} href={pdfAddress} download={name + '.pdf'} >下载论文</a>
			<div className={style["title"]}>{name}</div>
			<div className={style["content"]}>
				<iframe width="100%" height="100%" src={pdfAddress} frameBorder="0"></iframe>
				{/* <object data={pdfAddress} type="application/pdf" width="100%" height="100%"></object> */}
			</div>
		</div>
	);
};

export default ViewForm;