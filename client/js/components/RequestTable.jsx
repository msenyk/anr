import React from 'react'
import { Button, Table } from 'react-bootstrap';

export default React.createClass({
	buildRows() {
		return this.props.rows.map((row, index) => (<RequestRow key={index} row={row}></RequestRow>));
	},
	render() {
		return (
			<Table responsive hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Created</th>
						<th>IP</th>
						<th>Method</th>
						<th>URL</th>
						<th>Headers</th>
						<th>Body</th>
					</tr>
				</thead>
				<tbody>
					{ this.buildRows() }
				</tbody>
			</Table>
		);
	}
})

const RequestRow = React.createClass({
	getInitialState() {
		return {
			isShowHeaders: false,
			isShowBody: false
		}
	},
	createdDate() {
		return new Date(this.props.row.created).toString();
	},
	showHideHeaders() {
		this.setState({
			isShowHeaders: !this.state.isShowHeaders
		});
	},
	render() {
		return (
			<tr>
				<td></td>
				<td>{ this.createdDate() }</td>
				<td>{ this.props.row.ip }</td>
				<td>{ this.props.row.method }</td>
				<td>{ this.props.row.url}</td>
				<td><Button onClick={ this.showHideHeaders }>{ this.state.isShowHeaders ? 'Hide' : 'Show' }</Button></td>
				<td> show body </td>
			</tr>
		)
	}
})
