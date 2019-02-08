import React from "react"
import PropTypes from "prop-types"

const Field = (props) => {
    const {field, name} = props;
    return (
        <div className="form-group row">
          <label className="field col-sm-2 font-weight-bold">{name}</label>
          <div className="col-sm-6">{field instanceof Date ? field.toLocaleString('ru', {year: 'numeric', month: 'numeric', day: 'numeric'}) : field}</div>
        </div>
      );
}

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.deposit.date_start);
    console.log(typeof props.deposit.date_start);
    this.state = {
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


  render () {
    console.log(this.state.deposit);
    return (
      <div>
        <Field field={this.state.deposit.bank} name="Bank" />
        <Field field={this.state.deposit.date_start} name="Date start" />
        <Field field={this.state.deposit.date_end} name="Date end" />
        <Field field={this.state.deposit.amount} name="Amount" />
        <Field field={this.state.deposit.percent} name="Percent" />
      </div>
    );
  }
}

export default Deposit
