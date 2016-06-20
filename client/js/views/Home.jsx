import React from 'react'
import RequestTable from '../components/RequestTable.jsx'

export default React.createClass({
	render() {
		return (
			<div>
				<div className="container">
					<h1>Recent requests</h1>
					<p>{this.props.clientId}</p>
					<RequestTable />
				</div>
			</div>
		);
	}
})