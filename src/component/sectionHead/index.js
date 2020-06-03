/*
 * @Author: cdluxy
 * @Desc: 区块头部
 * @Date: 2020-05-04 20:57:07
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-05-04 21:15:21
 */

import React from 'react';
import sheetStyle from './style.scss?module';

 const SectionHead = ({children, style}) => {

	return (
		<div style={style} className={sheetStyle['section-title']}>{children}</div>
	);
 };

 export default SectionHead;