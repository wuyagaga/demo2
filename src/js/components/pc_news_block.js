import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

export default class PCNewsBlock extends React.Component {
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
		const {news} = this.state
		const newList = news.length
		? news.map((newsItem,index) => (
			<li key={index}>
				{/*details指定页面，${newsItem.uniquekey}携带的参数,target="_blank"新页面*/}
				{/*在引号里面引用变量，要使用$符号*/}
				<Link to={`details/${newsItem.uniquekey}`} target="_blank">
					{newsItem.title}
				</Link>
			</li>
			))
		: "没有加载到任何新闻..."
		;

		return (
			<div className="topNewsList">
				<Card>
		            <ul>
		              {newList}
		            </ul>
		          </Card>
			</div>
		);
	};
}