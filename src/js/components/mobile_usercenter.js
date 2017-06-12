import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {
	Tabs,
	message,
	Form,
	Input,
	Button,
	Checkbox,
	Card,
	notification,
	Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

export default class MobileUserCenter extends React.Component {
	constructor(){
		super();
		this.state={
			usercomments: '',
			usercollection:'',
			previewImage:'',
			previewVisible:false  //不可见
		}
	}

	componentDidMount(){
		var myFetchOptions = {
			method:'get'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
			.then(response=>response.json())
			.then(json=>{this.setState({usercollection:json});
			});//通过localStorage.userid获取收藏信息，

			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
			.then(response=>response.json())
			.then(json=>{
				this.setState({usercomments:json})
			});//通过localStorage.userid获取评论

	}

	render(){
		const props = {
			//提交地址，或者cdn网站
			action: 'http://newsapi.gugujiankong.com/handler.ashx',
			//跨域设置
			headers: {
				"Access-Control-Allow-Origin":"*"
			},
			//antd里的属性设置
			listType:'picture-card',
			//默认的样式，例子
			defaultFileList:[{
				uid:-1,
				name:'xxx.png',
				state: 'done',
				url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
				thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
			}],
			//预览：拿到图片的地址，然后显示
			onPreview: (file)=>{
				this.setState({previewImage: file.url,previewVisible:true});
			}
		};

		const {usercomments,usercollection} = this.state;
		const usercollectionList = usercollection.length
		? usercollection.map((uc,index) => (
			<Card key={index} title={uc.title} extra={<a  href={`/#/details/${uc.uniquekey}`}>查看</a>}>
				<p>{uc.Title}</p>
			</Card>
			))
		: "还没收藏新闻..."
		;

		const usercommentList = usercomments.length
		? usercomments.map((comment,index) => (
			<Card key={index} title={`于${comment.datetime}评论了文章${comment.uniquekey}`} 
				extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
				<p>{comment.Comments}</p>
			</Card>
			))
		: "还没评论过呢..."
		;

		return(
			<div>
				<MobileHeader/>
				<Row>					
					<Col span={24}>
						<Tabs>
			                <TabPane tab="我的收藏列表" key="1" >
			                	<div className="comment">
			                		<Row>
			                			<Col span={24}>
											{usercollectionList}
										</Col>
			                		</Row>
			                	</div>			                
			                </TabPane>
			                <TabPane tab="我的评论列表" key="2" >
			                	<div className="comment">
			                		<Row>
			                			<Col span={24}>
											{usercommentList}
										</Col>
			                		</Row>
			                	</div>
			                </TabPane>
			                <TabPane tab="头像设置" key="3" >
			                	<div className="clearfix">
			                		<Upload {...props}>
			                			<Icon type="plus"/>
			                			<div className="ant-upload-text">上传照片</div>
			                		</Upload>
			                		<Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel} >
			                			<img src={this.state.previewImage} alt="预览" />
			                		</Modal>
			                	</div>
			                </TabPane>
		                </Tabs>
					</Col>					
				</Row>
	            <MobileFooter/>
			</div>
		);
	};
}