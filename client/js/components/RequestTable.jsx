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
		let toggleHandler = (name) => this.toggleVisibility(name);
		return (
			<div>
				<Row>
					<Col lg={2} md={3}>
						{ this.createdDate() }<br/>
					</Col>
	  				<Col lg={10} md={9}>
	  					<p>
		  					<ToggleButton name="details" label="Details" visible={this.state.visibility.details} handler={ toggleHandler } />
		  					<ToggleButton name="headers" label="Headers" visible={this.state.visibility.headers} handler={ toggleHandler } />
		  					<ToggleButton name="body" label="Body" visible={this.state.visibility.body} handler={ toggleHandler } />
	  					</p>
						{ this.state.visibility.details ? <RequestDetails row={this.props.row}/> : '' }
						{ this.state.visibility.headers ? <RequestHeaders headers={this.props.row.headers}/> : '' }
						{ this.state.visibility.body ? <RequestBody body={this.props.row.body}/> : '' }
	  				</Col>
				</Row>
			</div>
		)
	}
})

const ToggleButton = React.createClass({
	render() {
		return (
			<Button onClick={ () => this.props.handler(this.props.name) }>{ this.props.visible ? 'Hide ' + this.props.label : 'Show '  + this.props.label }</Button>
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

const RequestBody = React.createClass({
	render() {
		return (
			<div>
				<p>
					<Label bsStyle="default">Body</Label>
				</p>
				<p>{ this.props.body }</p>
			</div>
		)
	}
})