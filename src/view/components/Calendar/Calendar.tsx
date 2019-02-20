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
    if (this.props.dates) {
      const now = new Date()
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
      const isAcive = ( date: any ) => {
        return today <= this.dateFromApiFormat(date).valueOf()
      }

      const resDates = this.props.dates.filter(isAcive)
      if (resDates.length) {
        this.onChange(this.dateFromApiFormat(resDates[0]))
      }
      const dates = new Set(resDates)

      this.setState({ dates });
    }
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

  dateFromApiFormat (date: string) {
    const items = date.split('.')
    if (items.length === 3) {
      return new Date(Number(items[2]), Number(items[1]) - 1, Number(items[0]))
    } else {
      return 0
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
