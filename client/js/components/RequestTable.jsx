import React from 'react'
import { Button, Table, Grid, Row, Col } from 'react-bootstrap';

export default React.createClass({
	buildRows() {
		return this.props.rows.map((row, index) => (<RequestRow key={index} row={row}></RequestRow>));
	},
	render() {
		return (
			<Grid>
				<Row className="show-grid" style={{borderBottom: '1px solid grey'}}>
      				<Col lg={2} md={3}>Created</Col>
      				<Col lg={10} md={9}>Request</Col>
      			</Row>
      			{ this.buildRows() }
			</Grid>
		);
	}
})

const RequestRow = React.createClass({
	getInitialState() {
		return {
			isShowHeaders: false,
			isShowBody: false,
			isShowDetails: false
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
	showHideDetails() {
		this.setState({
			isShowDetails: !this.state.isShowDetails
		});
	},
	render() {
		return (
			<div>
				<Row>
					<Col lg={2} md={3}>
						{ this.createdDate() }<br/>
					</Col>
	  				<Col lg={10} md={9}>
	  					<Button onClick={ this.showHideDetails }>{ this.state.isShowDetails ? 'Hide Details' : 'Show Details' }</Button>
	  					<Button onClick={ this.showHideHeaders }>{ this.state.isShowHeaders ? 'Hide Headers' : 'Show Headers' }</Button>
	  				</Col>
				</Row>
				{ this.state.isShowDetails ? <RequestDetails row={this.props.row}/> : '' }
				{ this.state.isShowHeaders ? <RequestHeaders headers={this.props.row.headers}/> : '' }
			</div>
		)
	}
})

const RequestDetails = React.createClass({
	render() {
		return (
			<Row>
				<Col lg={10} lgOffset={2}>
					<p>Details</p>
					IP: { this.props.row.ip } <br/>
					Method: { this.props.row.method } <br/>
					URL: { this.props.row.url}
				</Col>
			</Row>
		)
	}
})

const RequestHeaders = React.createClass({
	buildHeaders() {
		return Object.keys(this.props.headers)
			.map((item, index) => (<HeaderItem key={index} name={item} value={this.props.headers[item]}></HeaderItem>));
	},
	render() {
		return (
			<Row>
				<Col lg={12}>
					<p>Headers</p>
					{ this.buildHeaders() }
				</Col>
			</Row>
		)
	}
})

const HeaderItem = React.createClass({
	render() {
		return (
			<p>{this.props.name}: {this.props.value}</p>
		)
	}
})