import React from "react"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker"
import update from 'immutability-helper'

class DepositForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: props.edit == true,
      post_url: props.post_url,
      deposit: {
        bank: props.deposit.bank,
        date_start: new Date(props.deposit.date_start),
        date_end: new Date(props.deposit.date_end),
        amount: Number.parseFloat(props.deposit.amount),
        percent: Number.parseFloat(props.deposit.percent)
      }
    }
  }

  static defaultProps = {
    edit: false,
    post_url: '#',
    deposit: {
      bank: '',
      date_start: String(new Date()),
      date_end: String(new Date()),
      amount: '0',
      percent: '0'
    }
  }

  static propTypes = {
    deposit: PropTypes.object,
    post_url: PropTypes.string
  }

  handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target;
    const deposit = this.state.deposit;
    deposit[name] = value;

    this.setState({deposit: deposit})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.edit) {
      $.ajax({
        url: this.props.post_url,
        method: 'PUT',
        data: {deposit: this.state.deposit},
        success: (data) => {
          window.location = this.props.post_url;
        }
      })
    }
    else {
      $.post(this.props.post_url, {deposit: this.state}, (data) => {window.location = this.props.post_url} )
    }
  }

  validDates = (date1, date2) => {
    return date1 == null || date2 == null || date1 <= date2
  }

  handleChangeDateStart = (date) => {
    if (!this.validDates(date, this.state.deposit.date_end)) {
      date = this.state.deposit.date_end
    }
    this.setState(update(this.state, {deposit: {date_start: {$set: date}}}))
  }

  handleChangeDateEnd = (date) => {
    if (!this.validDates(this.state.deposit.date_start, date)) {
      date = this.state.deposit.date_start
    }
    this.setState(update(this.state, {deposit: {date_end: {$set: date}}}))
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Bank</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" name="bank" placeholder="Bank" value={this.state.deposit.bank} onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Date start</label>
          <div className="col-sm-10">
            <DatePicker className="form-control" dateFormat="yyyy-MM-dd" selected={this.state.deposit.date_start} onChange={this.handleChangeDateStart} />
          </div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Date end</label>
          <div className="col-sm-10">
            <DatePicker className="form-control" dateFormat="yyyy-MM-dd" selected={this.state.deposit.date_end} onChange={this.handleChangeDateEnd} />
          </div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Amount</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name="amount" placeholder="Amount" value={this.state.deposit.amount} onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Percent</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name="percent" placeholder="Percent" value={this.state.deposit.percent} onChange={this.handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">{this.state.edit ? "Update Deposit" : "Create Deposit"}</button>
      </form>
    );
  }
}

export default DepositForm
