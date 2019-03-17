import React from 'react';
import ReactCalendar from 'react-calendar'

export interface ICalendarProps {
  dates: string[];
  onChange: Function;
}

export interface ICalendarState {
  visible: boolean;
  selected: Date | undefined;
  dates: Set<string>;
  datesDefault: string[];
}

export class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  constructor (props: ICalendarProps) {
    super(props);

    this.setState = this.setState.bind(this)
  }

  state = {
    selected: undefined,
    visible: false,
    dates: new Set(),
    datesDefault: [],
  }

  onChange (selected: Date) {
    this.props.onChange( selected.getTime() )
    this.setState({ selected })
  }

  updateProps(nextProps: ICalendarProps) {
    if (nextProps.dates) {
      const now = new Date()
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
      const isAcive = ( date: string ) => {
        return today <= this.dateFromApiFormat(date).valueOf()
      }

      const resDates = nextProps.dates.filter(isAcive)
      const dates = new Set(resDates)

      this.setState({ dates });
      if (resDates.length) {
        this.onChange(this.dateFromApiFormat(resDates[0]))
      }
    }
  }

  isEqualArrays (arr1: string[], arr2: string[]) {
    if (arr1.length !== arr2.length) {
      return false
    } else {
      for (let i in arr1) {
        if (arr1.hasOwnProperty(i) && arr2.hasOwnProperty(i)) {
          if (arr1[i] !== arr2[i]) {
            return false
          }
        } else {
          return false
        }
      }
    }
    return true
  }

  componentWillReceiveProps(nextProps: ICalendarProps) {
    if (!this.isEqualArrays(nextProps.dates, this.state.datesDefault)) {
      this.setState({ datesDefault: nextProps.dates }, () => this.updateProps(nextProps))
    }
  }

  componentDidMount () {
    this.setState({ datesDefault: this.props.dates }, () => this.updateProps(this.props))
  }

  toTwoCharacterFormat (value: number) {
    if (value >= 10) {
      return String(value)
    } else {
      return `0${value}`
    }
  }

  dateToApiFormat (date: Date | undefined) {
    if (date) {
      return `${this.toTwoCharacterFormat(date.getDate())}.${this.toTwoCharacterFormat(date.getMonth() + 1)}.${String(date.getFullYear())}`
    } else {
      return ''
    }
  }

  dateFromApiFormat (date: string) {
    try {
      const items = date.split('.')
      return new Date(Number(items[2]), Number(items[1]) - 1, Number(items[0]))
    } catch (e) {
      console.warn(e)
      return new Date(0)
    }

  }

  render() {
    return (
      <>
        <input
          onClick={() =>
            this.setState((state: ICalendarState) => ({ visible: !state.visible }))
          }
          value={this.dateToApiFormat(this.state.selected)}
          readOnly
        />
        {this.state.visible && (
          <ReactCalendar
            minDate={new Date()}
            onChange={(date) => {
              if (date instanceof Date) {
                this.onChange(date)
              }
            }}
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
