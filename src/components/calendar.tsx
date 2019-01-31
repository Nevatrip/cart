import React from 'react';
import Calendar from 'react-calendar'

class CustomCalendar extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.getData = this.getData.bind(this)
    this.setState = this.setState.bind(this)
  }
  state = {
    selected: undefined,
    visible: false,
    dates: new Set(),
  }
  onChange (selected: any) {
    console.log(selected)
    this.setState({ selected })
  }
  getData () {
    const self = this
    const url: string = this.props.url
    const XHR = XMLHttpRequest;
    const xhr = new XHR();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      try {
        const data = JSON.parse(this.responseText);
        if (xhr.status === 200) {
          const dates = data.dates ? new Set(data.dates) : new Set()
        
          self.setState({dates})
        } else {
          console.error(xhr.status)
        }
      } catch (e) {
        console.error(e)
      }
    };
    xhr.onerror = function (e) {
      console.error(e)
    };
    xhr.send();
  }
  componentDidMount () {
    this.getData()
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
      <div>
        <input onClick={() => this.setState((state: any) => ({visible: !state.visible}))} value={this.dateToApiFormat(this.state.selected)} readOnly></input>
        {this.state.visible ? <Calendar
            onChange={(date) => this.onChange(date)}
            value={this.state.selected}
            tileDisabled={({date}) => {
                const formatedDate = this.dateToApiFormat(date)
                return !this.state.dates.has(formatedDate)
            }}
        /> : null}
      </div>
    );
  }
}

export default CustomCalendar;
