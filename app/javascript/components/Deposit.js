import React from "react"
import PropTypes from "prop-types"

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.deposit.date_start);
    this.state = {
      id: props.deposit.id,
      edit: props.edit == true,
      deposit: props.deposit == null ? {
        bank: '',
        date_start: new Date(),
        date_end: new Date(),
        amount: '',
        percent: ''
      } : {
        bank: props.deposit.bank,
        date_start: new Date(props.deposit.date_start),
        date_end: new Date(props.deposit.date_end),
        amount: Number.parseFloat(props.deposit.amount),
        percent: Number.parseFloat(props.deposit.percent)
      }
    }
  }

  static propTypes = {
    deposit: PropTypes.any,
    url: PropTypes.string
  }

  render () {
    console.log(this.state.date_start);
    return (
      <div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Bank</label>
          <div className="col-sm-6">{this.state.deposit.bank}</div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_date_start">Date start</label>
          <div className="col-sm-10">{this.props.deposit.date_start}</div>
        </div>
      </div>
    );
  }
}

        /*
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_bank">Bank</label>
          <div className="col-sm-6">{this.state.deposit.bank}</div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_date_start">Date start</label>
          <div className="col-sm-10">{this.state.deposit.date_start}</div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_date_end">Date end</label>
          <div className="col-sm-10">{this.state.deposit.date_end}</div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_amount">Amount</label>
          <div className="col-sm-4">{this.state.deposit.amount}</div>
        </div>
        <div className="form-group row">
          <label className="field col-form-label col-sm-2" htmlFor="deposit_percent">Percent</label>
          <div className="col-sm-4">{this.state.deposit.percent}</div>
        </div>*/

export default Deposit
