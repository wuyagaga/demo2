import React from 'react';
import { Col, Row} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'

class PCHeader extends React.Component {
	constructor(){
		super();
		this.state = {
			current: 'top',			//默认选中
			modalVisible:false,		//是否显示模态框
			action:'login',			//登陆还是登出
			hasLogined:false,		//是否登陆
			userNickName:'',		//用户默认名称
			userid: 0				//默认id
		}
	}

	componentWillMount(){
		if(localStorage.userid != ''){
			this.setState({hasLogined:true});
			{/*localStorage,HTML5的缓存机制,从缓存中调用信息*/}
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
	}

	// 设置模态框显示与否的方法
	setModalVisible(value){
		this.setState({
			modalVisible: value
		})
	}

	handleClick(e){
		if(e.key == "register"){
			this.setState({current:"register"});
			this.setModalVisible(true);
		}else{
			this.setState({current:e.key})
		}
	}



	handleSubmit(e){
		e.preventDefault();{/*阻止冒泡*/}
		var myFetchOptions = {method:'get'};{/*定义获取的方法*/}
		var formData = this.props.form.getFieldsValue();{/*表中的值*/}
		{/*格式化返回的数据*/}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userNickName:json.NickUserName,userid:json.UserId});
			localStorage.userid = json.UserId;{/*localStorage,HTML5的缓存机制*/}
			localStorage.userNickName = json.NickUserName;
		})
		if(this.state.action == 'login'){
			this.setState({hasLogined:true});
		}
		message.success('请求成功');{/*小弹窗提示成功*/}
		this.setModalVisible(false);{/*注册成功后，模态框消失*/}
	}

	callback(key){
		if(key == 1){
			this.setState({action:'login'});{/*action动作为后面传参用*/}
		}else if( key == 2){
			this.setState({action:'register'});
		}
	}

	logout(){
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false});
	}

	render() {
		let {getFieldDecorator} = this.props.form;{/*双向数据流*/}
		//定义三元表达式，可以插入任何地方
		const userShow = this.state.hasLogined  
		?   <Menu.Item key="logout" className="register">
					{/*type="样式" htmlType="功能"*/}
				<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
				&nbsp;&nbsp;
			<Link target="_blank" to={`/usercenter`}>
				<Button type="dashed" htmlType="button" >个人中心</Button>
			</Link>
			&nbsp;&nbsp;
			<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
			</Menu.Item>
		:   <Menu.Item key="register" className="register">
				注册/登录
			</Menu.Item>
		;	

		return (
			<header>
				<Row>
					<Col span={2}></Col>{/*响应式布局，类似bootstrap中的栅格*/}
					<Col span={4}>
						<a href="/" class="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>ReactNEWS</span>
						</a> 
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)}
						 selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="appstore"/>头条
							</Menu.Item>
							<Menu.Item key="shehui">
								社会
							</Menu.Item>
							<Menu.Item key="guonei">
								国内
							</Menu.Item>
							<Menu.Item key="guoji">
								国际
							</Menu.Item>
							<Menu.Item key="yule">
								娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								体育
							</Menu.Item>
							<Menu.Item key="keji">
								科技
							</Menu.Item>
							{userShow}
						</Menu>
							{/*wrapClassName自有属性，窗口中间*/}
							{/*visible显示属性*/}
							{/*onOk,okText,onCancel自有的属性方法*/}
						<Modal title="用户中心" wrapClassName="vertical-center-modal"
						 	visible={this.state.modalVisible}						
							onOk={() => this.setModalVisible(false)}
							okText="关闭"
							onCancel={() => this.setModalVisible(false)} >
							<Tabs type="card" onChange={this.callback.bind(this)}>
								{/*前面已经定义 TabPane = Tabs.TabPane*/}
								<TabPane tab="登陆" key="1">{/*tab=注册 类似title 第二个选项卡*/}
									<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{/*antd输入框的设置方法*/}
											{getFieldDecorator('userName')(
												<Input placeholder="请输入您的账号" />
											)}
										</FormItem>
										<FormItem label="密码">
											{getFieldDecorator('password')(
												<Input type="password" placeholder="请输入密码" />
											)}
						          		</FormItem>
						          		<Button type="primary" htmlType="submit">登陆</Button>
									</Form>
								</TabPane>
								{/*前面已经定义 TabPane = Tabs.TabPane*/}
								<TabPane tab="注册" key="2">{/*tab=注册 类似title 第二个选项卡*/}
									<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{/*antd输入框的设置方法*/}
											{getFieldDecorator('userName')(
												<Input placeholder="请输入您的账号" />
											)}
										</FormItem>
										<FormItem label="密码">
											{getFieldDecorator('r_password')(
												<Input type="password" placeholder="请输入密码" />
											)}
						          		</FormItem>
											<FormItem label="确认密码" >
											{getFieldDecorator('r_confirmPassword')(
												 <Input type="password" placeholder="请再次输入密码" />
											)}
						          		</FormItem>
						          		<Button type="primary" htmlType="submit">注册</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>

					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		);
	};
}

export default PCHeader = Form.create({})(PCHeader);