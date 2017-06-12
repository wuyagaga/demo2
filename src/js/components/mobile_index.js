import React from 'react';
import {Tabs,Carousel} from 'antd';
const TabPane = Tabs.TabPane;

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
import ReactPullToRefresh from './mobile_list_pull_refresh';

export default class MobileIndex extends React.Component {
	render() {
		//settings为自有的设置，可直接参考antd
		const settings = {
	      dots:true,		//
	      infinite:true,	//是否无心啊播放
	      speed:300,		//速度
	      slidesToShow:1,	//起始页面
	      autoplay:true		//自动播放
	    };
		return (
			<div>
				<MobileHeader/>
					<Tabs>
						<TabPane tab="头条" key="1">
							<Carousel {...settings}>
							  <div><img src="./src/images/carousel_1.jpg"/></div>
			                  <div><img src="./src/images/carousel_2.jpg"/></div>
			                  <div><img src="./src/images/carousel_3.jpg"/></div>
			                  <div><img src="./src/images/carousel_4.jpg"/></div>
							</Carousel>
							<MobileList count={20} type="top" />
						</TabPane>
						<TabPane tab="社会" key="2">
 					        <MobileList count={20} type="shehui"/>							
						</TabPane>
						<TabPane tab="国内" key="3">
							<ReactPullToRefresh count={20} type="guonei"/>
						</TabPane>
						<TabPane tab="国际" key="4">
							<MobileList count={20} type="guoji"/>
						</TabPane>
						<TabPane tab="娱乐" key="5">
							<MobileList count={20} type="yule"/>
						</TabPane>
					</Tabs>

				<MobileFooter/>
			</div>
		);
	};
}