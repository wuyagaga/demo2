import React from 'react';
import { Col, Row} from 'antd';

export default class MobileFooter extends React.Component {
	
	render() {
		return (
			<footer>
				<Row>
					<Col span={2}></Col>
					<Col span={20} class="footer">
						&copy;&nbsp;YKY ReactNews. All Rights Reserved.
					</Col>
					<Col span={2}></Col>
				</Row>
			</footer>
		);
	};
}