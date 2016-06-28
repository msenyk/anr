import React from 'react'
import { Button, Table, Grid, Row, Col, Label } from 'react-bootstrap';

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
			isShowDetails: false,
			visibility: {
				details: false,
				headers: false,
				body: false
			}
		}
	},
	createdDate() {
		return new Date(this.props.row.created).toString();
	},
	toggleVisibility(partName) {
		let visibility = this.state.visibility;
		visibility[partName] = !this.state.visibility[partName];
		this.setState({
			visibility
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
	  					<p>
		  					<Button onClick={ () => this.toggleVisibility('details') }>{ this.state.visibility.details ? 'Hide Details' : 'Show Details' }</Button>
		  					<Button onClick={ () => this.toggleVisibility('headers') }>{ this.state.visibility.headers ? 'Hide Headers' : 'Show Headers' }</Button>
	  					</p>
						{ this.state.visibility.details ? <RequestDetails row={this.props.row}/> : '' }
						{ this.state.visibility.headers ? <RequestHeaders headers={this.props.row.headers}/> : '' }
	  				</Col>
				</Row>
			</div>
		)
	}
})

const RequestDetails = React.createClass({
	render() {
		return (
			<div>
				<p>
					<Label bsStyle="default">Details</Label>
				</p>
				<p>
					IP: { this.props.row.ip } <br/>
					Method: { this.props.row.method } <br/>
					URL: { this.props.row.url}
				</p>
			</div>
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
			<div>
				<p>
					<Label bsStyle="default">Headers</Label>
				</p>
				<ul>
				{ this.buildHeaders() }
				</ul>
			</div>
		)
	}
})

const HeaderItem = React.createClass({
	render() {
		return (
			<li>{this.props.name}: {this.props.value}</li>
		)
	}
})