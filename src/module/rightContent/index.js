/*
 * @Author: cdluxy
 * @Desc: 右侧内容区
 * @Date: 2020-04-25 22:03:52
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-04 00:13:56
 */
import React from 'react';
import {
	Switch,
	Route,
} from "react-router-dom";
import Crumbs from '../../component/crumbs';
// import CaseList from '../caseListPage';
// import CaseDetail from '../caseDetailPage';
import DataOverview from '../dataOverview';
import IndicatorsWarehouse from '../indicatorsWarehouse';
import LiteratureQuery from '../literatureQuery';
import UserManagement from '../userManagement';
import EditUsername from '../editUsername';
import EditPassword from '../editPassword';
import style from './style.scss?module';

const RightContent = () => {

	return (
		<>
			<div className={style['top-nav']}>
				<Switch>
					<Route path="/main/:pathId" render={({match}) => <Crumbs hasPath={match.url} /> }>
					</Route>
				</Switch>
			</div>
			<div className={style["route-content"]}>
				<Switch>
					{/* <Route path="/main/caseList">
						<CaseList />
					</Route>
					<Route path="/main/caseDetail/:caseId" 
						render={({ match }) => <CaseDetail caseId={match.params.caseId} /> }>
					</Route> */}
					<Route path="/main/dataOverview">
						<DataOverview />
					</Route>
					<Route path="/main/indicatorsWarehouse">
						<IndicatorsWarehouse />
					</Route>
					<Route path="/main/literatureQuery">
						<LiteratureQuery />
					</Route>
					<Route path="/main/editName">
						<EditUsername />
					</Route>
					<Route path="/main/editPassword">
						<EditPassword />
					</Route>
					<Route path="/main/userManagement">
						<UserManagement/>
					</Route>
					<Route path="/">
						<div class={style['welcome']}>欢迎光临</div>
					</Route>
				</Switch>
			</div>
		</>
	);
}

export default RightContent;