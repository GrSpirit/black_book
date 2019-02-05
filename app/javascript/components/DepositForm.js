import React from "react"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker"


class DepositForm extends React.Component {
  state = {
    bank: '',
    date_start: new Date(),
    date_end: new Date(),
    amount: '',
    percent: ''
  } 

  static propTypes = {
    bank: PropTypes.string,
    date_start: PropTypes.instanceOf(Date),
    date_end: PropTypes.instanceOf(Date),
    amount: PropTypes.number,
    percent: PropTypes.number
  }

  handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target;

    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    $.post('/deposits', {deposit: this.state}, (data) => {window.location = "/deposits"} )
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Bank</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" name="bank" placeholder="Bank" value={this.state.bank} onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Date start</label>
          <div className="col-sm-10">
            <DatePicker className="form-control" dateFormat="yyyy-MM-dd" selected={this.state.date_start} onChange={(date) => this.setState({date_start: date})} />
          </div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Date end</label>
          <div className="col-sm-10">
            <DatePicker className="form-control" dateFormat="yyyy-MM-dd" selected={this.state.date_end} onChange={(date) => this.setState({date_end: date})} />
          </div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Amount</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name="amount" placeholder="Amount" value={this.state.amount} onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Percent</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name="percent" placeholder="Percent" value={this.state.percent} onChange={this.handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Create Deposit</button>
      </form>
    );
  }
}

export default DepositForm
