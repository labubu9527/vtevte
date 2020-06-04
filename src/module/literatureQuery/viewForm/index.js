/*
 * @Author: cdluxy
 * @Desc: 查看论文弹框使用的表单
 * @Date: 2020-05-17 22:53:31
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-04 23:22:03
 */
import React, { useState, useEffect, useRef } from 'react';
import { sendGet } from 'rootSrc/common/request';
import style from './style.scss?module';

// import PDFJS from 'pdfjs-dist';

// PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

//打开全屏方法
function openFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullScreen();
	}
}

const ViewForm = ({modalCloseFun, formData}) => {
	// console.log('formData:', formData);

	const [pdfAddress, setPdfAddress] = useState('');
	const wrapEl = useRef(null);

	// 查询论文列表数据
	useEffect(() => {
		const {id} = formData;
		sendGet(`/data_overview/literatures/${id}`, { id }, {isBlob: true}).then((data) => {

			const binaryData = [];
			binaryData.push(data);
			const blobUrl = window.URL.createObjectURL(new Blob(binaryData, {type:"application/pdf;chartset=utf-8"}));
			setPdfAddress(blobUrl);

			// openFullscreen(wrapEl.current);
		});
	}, []);

	const fullscreen = () => {
		openFullscreen(wrapEl.current);
	}

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
			<div className={style["btn-area"]}>
				<a className={style["download"]} href={pdfAddress} download={name + '.pdf'} >下载论文</a>
				<button onClick={() => fullscreen()} className={style["full"]} >全屏查看</button>
			</div>
			<div className={style["title"]}>{name}</div>
			<div className={style["content"]}>
				<iframe ref={wrapEl} width="100%" height="100%" src={pdfAddress} frameBorder="0"></iframe>
				{/* <object data={pdfAddress} type="application/pdf" width="100%" height="100%"></object> */}
			</div>
		</div>
	);
};

export default ViewForm;