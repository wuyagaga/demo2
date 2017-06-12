import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

export default class PCNewsImageBlock extends React.Component {
	constructor(){
		super();
		this.state = {
			news: ''
		};
	}

	componentWillMount(){
		var myFetchOptions = {method:'get'};
		{/*this.props,由于本组件将由其他地方调用，调用的同时传入参数即可实现功能*/}
		{/*response => response.json(),必须指定*/}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
		 + this.props.type + "&count=" + this.props.count,myFetchOptions)
		.then(response => response.json())
		.then(json => this.setState({news:json}))
	}

	render() {
		const styleImage = {
	      display: "block",
	      width: this.props.imageWidth,
	      height: "90px"
	    };
	    /* 点点点的样式：
	      whiteSpace: "nowrap",
	      overflow: "hidden",
	      textOverflow: "ellipsis"*/
	    const styleH3 = {
	      width: this.props.imageWidth,
	      whiteSpace: "nowrap",
	      overflow: "hidden",
	      textOverflow: "ellipsis"
	    };
		const {news} = this.state;
		const newList = news.length
		? news.map((newsItem,index) => (
			<div key={index}  className="imageblock"> 
				<Link to={`details/${newsItem.uniquekey}`} target="_blank">
					<div className="custom-image">
						<img style={styleImage} src={newsItem.thumbnail_pic_s} alt=''/>
					</div>
					<div className="custom-card">
						<h3 style={styleH3}>{newsItem.title}</h3>
						<p>{newsItem.author_name}</p>
					</div>
				</Link>
			</div>
			))
		: "没有加载到任何新闻..."
		;

		return (
			<div className="topNewsList">
				<Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}} >
		            {newList}
		        </Card>
			</div>
		);
	};
}