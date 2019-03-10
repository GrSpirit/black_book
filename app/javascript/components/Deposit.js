import React from "react"
import PropTypes from "prop-types"

const Field = (props) => {
    String.prototype.toFieldName = function() {
      return s.toLowerCase().replace(' ', '_')
    }
    const {edit, field, name, description, onChange} = props;
    let fieldElement;
    if (edit) {
      fieldElement = field instanceof Date ? field.toLocaleString('ru', {year: 'numeric', month: 'numeric', day: 'numeric'}) : field;
    }
    else {
      fieldElement = <input type="text" className="form-control" name={name.toFieldName()} placeholder={description} value={field} onChange={onChange} />;
    }
    return (
        <div className="form-group row">
          <label className="field col-sm-2 font-weight-bold">{name}</label>
          <div className="col-sm-6">{fieldElement}</div>
        </div>
      );
}

class Deposit extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.deposit.date_start);
    console.log(typeof props.deposit.date_start);
    this.state = {
      edit: props.edit,
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
    let deposit = this.state.deposit;
    deposit[name] = value;
    console.log(name, value, deposit);

    this.setState({deposit: deposit})
  }

  render () {
    console.log(this.state.deposit);
    return (
      <div>
        <Field field={this.state.deposit.bank} name="Bank" edit={this.state.edit} onChange={this.handleChange} />
        <Field field={this.state.deposit.date_start} name="Date start" edit={this.state.edit} onChange={this.handleChange} />
        <Field field={this.state.deposit.date_end} name="Date end" edit={this.state.edit} onChange={this.handleChange} />
        <Field field={this.state.deposit.amount} name="Amount" edit={this.state.edit} onChange={this.handleChange} />
        <Field field={this.state.deposit.percent} name="Percent" edit={this.state.edit} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Deposit
