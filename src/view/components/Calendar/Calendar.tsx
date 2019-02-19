import React from 'react';
import ReactCalendar from 'react-calendar'

export class Calendar extends React.Component<any, any> {
  constructor (props: any) {
    super(props);

    this.setState = this.setState.bind(this)
  }

  state = {
    selected: undefined,
    visible: false,
    dates: new Set(),
  }

  onChange (selected: any) {
    console.log(selected)
    this.props.onChange( selected.getTime() )
    this.setState({ selected })
  }

  componentDidMount () {
    const dates = this.props.dates
      ? new Set(this.props.dates)
      : new Set();
    this.setState({ dates });
  }

  toTwoCharacterFormat (value: number) {
    if (value >= 10) {
      return String(value)
    } else {
      return `0${value}`
    }
  }

  dateToApiFormat (date: any) {
    if (date) {
      return `${this.toTwoCharacterFormat(date.getDate())}.${this.toTwoCharacterFormat(date.getMonth() + 1)}.${String(date.getFullYear())}`
    } else {
      return ''
    }
  }

  render() {
    return (
      <>
        <input
          onClick={() =>
            this.setState((state: any) => ({ visible: !state.visible }))
          }
          value={this.dateToApiFormat(this.state.selected)}
          readOnly
        />
        {this.state.visible && (
          <ReactCalendar
            minDate={new Date()}
            onChange={date => this.onChange(date)}
            value={this.state.selected}
            tileDisabled={({ date }) => {
              const formatedDate = this.dateToApiFormat(date);
              return !this.state.dates.has(formatedDate);
            }}
          />
        )}
      </>
    );
  }
}
