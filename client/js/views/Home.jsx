import React from 'react'
import RequestTable from '../components/RequestTable.jsx'

const requestLogRecords = [
	{
		created: new Date().valueOf(),
		ip: '127.0.0.1',
		method: 'POST',
		url: 'query?id=2',
		headers: {'content-type': 'text/plain'},
		body: 'Simple body example'
	},
	{
		created: 1233443322899,
		ip: '127.0.0.2',
		method: 'GET',
		url: 'query?id=1&a=b',
		headers: {'content-type': 'text/html'}
	}
];

export default React.createClass({
	render() {
		return (
			<div>
				<div className="container-fluid">
					<h1>Recent requests</h1>
					<p>{this.props.clientId}</p>
					<RequestTable rows={requestLogRecords} />
				</div>
			</div>
		);
	}
})