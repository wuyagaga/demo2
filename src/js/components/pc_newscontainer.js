import React from 'react';
import {Row, Col,Tabs,Carousel} from 'antd';
const TabPane = Tabs.TabPane;

import PCNewsBlock from './pc_news_block'
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_products';

export default class PCNewsContainer extends React.Component {
	
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
			<Row>
				<Col span={1}></Col>
				<Col span={22} className="container">
					<div className="leftContainer">
						<div className="carousel">
							<Carousel {...settings}>
							  <div><img src="./src/images/carousel_1.jpg"/></div>
			                  <div><img src="./src/images/carousel_2.jpg"/></div>
			                  <div><img src="./src/images/carousel_3.jpg"/></div>
			                  <div><img src="./src/images/carousel_4.jpg"/></div>
							</Carousel>
						</div>
						<PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"/>
					</div>
					<Tabs class="tabs_news">
						<TabPane tab="头条" key="1">
							{/*count={20} type="top" 两种方式传参都可以，bordered自有边框属性*/}
							<PCNewsBlock count={20} type="top" width='100%' bordered="false" />
						</TabPane>
						<TabPane tab="国际" key="2">
			                <PCNewsBlock count={20} type="guoji" width="100%" bordered="false"/>
			            </TabPane>
			            <TabPane tab="社会" key="3">
			                <PCNewsBlock count={20} type="shehui" width="100%" bordered="false"/>
			            </TabPane>
					</Tabs>
					<Tabs class="tabs_product">
						<TabPane tab="ReactNEWS 产品" key="1">
							<PCProduct/>
			            </TabPane>
					</Tabs>
					<div>
		              <PCNewsImageBlock count={7} type="guoji" width="100%" cartTitle="国际新闻" imageWidth="132px"/>
		              <PCNewsImageBlock count={14} type="yule" width="100%" cartTitle="娱乐" imageWidth="132px"/>
		            </div>
				</Col>
				<Col span={1}></Col>
			</Row>
		);
	};
}