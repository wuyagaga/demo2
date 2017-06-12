import React from 'react';
import {Row, Col} from 'antd';
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

class MobileHeader extends React.Component {
	constructor(){
	    super();
	    this.state= {
	      current: 'top',
	      modalVisible: false,
	      action:'login',
	      hasLogined: false,
	      userNickName: '',
	      userid:0

	    };
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

	login(){
		this.setModalVisible(true);
	}

	render() {
		let {getFieldDecorator} = this.props.form;{/*双向数据流*/}
		const userShow = this.state.hasLogined
		? <Link to={`/usercenter`}>
			<Icon type="inbox"/>	
		  </Link>
		: <Icon type="setting" onClick={this.login.bind(this)}/>
		;
		return (
			<div id="mobileheader">
				<header>
					<img src="./src/images/logo.png" alt="logo"/>
					<span>ReactNEWS</span>
					{userShow}
				</header>
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
			</div>
		);
	};
}

export default MobileHeader = Form.create({})(MobileHeader);