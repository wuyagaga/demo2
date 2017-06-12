import React from 'react';
import { Col, Row} from 'antd';

export default class PCFooter extends React.Component {
	
	render() {
		return (
			<footer>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className="footer">
						&copy;&nbsp;YKY ReactNews. All Rights Reserved.
					</Col>
					<Col span={2}></Col>
				</Row>
			</footer>
		);
	};
}