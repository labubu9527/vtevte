/*
 * @Author: cdluxy
 * @Desc: 文件说明
 * @Date: 2020-04-19 13:31:08
 * @LastEditors: cdluxy
 * @LastEditTime: 2020-06-03 10:57:54
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN'; // 引入语言包
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Spin } from 'antd';
import { LoginInfoProvider } from './hooks/loginInfo';
import LoginAuth from './common/loginAuth';
import Login from './module/login';
import MainLayout from './module/mainLayout';
import style from './app.scss?module';

moment.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <>
        <LoginInfoProvider>
          <Switch>
            <LoginAuth path="/main">
              <MainLayout />
            </LoginAuth>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </LoginInfoProvider>
        <Spin size="large" className={style["body-loading"]} />
      </>
    </ConfigProvider>
  );
}

// const [{hasLogin}] = useLoginInfo();

export default App;
