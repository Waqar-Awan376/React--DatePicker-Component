import {Component} from "react";

class Picker extends Component{
    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    constructor(){
        super();
        this.state={
            curDate:new Date(),
            showDate:new Date(),
            prevDates:[],
            curDates:[],
            nextDates:[],
            rendered:false
        }
    }
    renderCalender(dateToRender){
        let currentDate = new Date(dateToRender);
        currentDate.setDate(1);
        let previousDate = new Date(dateToRender);
        previousDate.setDate(1);
        previousDate.setHours(-1);
        let pd = [];
        let datesFilled = 0;
        for (let i = 0; i < currentDate.getDay(); i++) {
            pd.unshift(previousDate.getDate());
            previousDate.setDate(previousDate.getDate() - 1);
            datesFilled++;
        }



        let actualDate = new Date(dateToRender);
        actualDate.setDate(1);
        let nextMonthOfCur = new Date(dateToRender);
        nextMonthOfCur.setDate(1);
        nextMonthOfCur.setMonth(dateToRender.getMonth() + 1);
        nextMonthOfCur.setHours(-1);
        let cd = [];
        for (let i = 1; i <= nextMonthOfCur.getDate(); i++) {
            cd.push(actualDate.getDate());
            actualDate.setDate(actualDate.getDate() + 1);
            datesFilled++;
        }

        let nextDate = new Date(dateToRender);
        nextDate.setMonth(nextDate.getMonth() + 1);
        nextDate.setDate(1);
        let nd = [];
        for (let i = nextDate.getDate(); datesFilled < 42; i++) {
            nd.push(nextDate.getDate());
            nextDate.setDate(nextDate.getDate() + 1);
            datesFilled++;
        }
        this.setState({prevDates:pd,curDates:cd,nextDates:nd});
    }
    componentDidMount() {
        this.renderCalender(new Date());
    }

    onPrevHandler = () => {
        let currentDate = new Date(this.state.showDate);
        currentDate.setMonth(currentDate.getMonth() - 1);
        this.renderCalender(currentDate);
        this.setState({showDate:new Date(currentDate)});
    };

    onNextHandler = () => {
        let currentDate = new Date(this.state.showDate);
        currentDate.setMonth(currentDate.getMonth() + 1);
        this.renderCalender(currentDate);
        this.setState({showDate:new Date(currentDate)});
    };

    prevDateSelectHandler = (dayDate) => {
        let currentDate = new Date(this.state.showDate);
        currentDate.setMonth(this.state.showDate.getMonth() - 1);
        currentDate.setDate(dayDate);
        this.renderCalender(currentDate);
        this.setState({curDate:new Date(currentDate)});
        this.setState({showDate:new Date(currentDate)});
    };

    curDateSelectHandler = (dayDate) => {
        let currentDate = new Date(this.state.showDate);
        currentDate.setDate(dayDate);
        this.renderCalender(currentDate);
        this.setState({curDate:new Date(currentDate)});
        this.setState({showDate:new Date(currentDate)});
    };

    nextDateSelectHandler = (dayDate) => {
        let currentDate = new Date(this.state.showDate);
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(dayDate);
        this.renderCalender(currentDate);
        this.setState({curDate:new Date(currentDate)});
        this.setState({showDate:new Date(currentDate)});
    };
    setToCurDate = () => {
        this.setState({showDate:this.state.curDate});
        this.renderCalender(this.state.curDate);
    };
    render(){
        let n=0;
        return(
            <div className="picker-container containerId">
                <header className="picker-header picker">
        <span className="move-direction" onClick={this.onPrevHandler.bind(this)} id="prev">
          {" "}
            &lt;{" "}
        </span>
                    <span
                        onClick={this.setToCurDate.bind(this)}
                        className="cursor-pointer month"
                        id="display"
                    >
          <span>{this.months[this.state.showDate.getMonth()]} </span> <span>{this.state.showDate.getFullYear()}</span>
        </span>
                    <span className="move-direction" onClick={this.onNextHandler.bind(this)} id="next">
          &gt;
        </span>
                </header>
                <div className="day-container margin-top-5 week">
                    {this.days.map((dayName) => (
                        <span className="text-align-center" key={dayName}>
            {dayName.substr(0, 1).toUpperCase()}
          </span>
                    ))}
                </div>
                <div className="dateNumber-container margin-top-5">
                    {this.state.prevDates.map((dayDate) => (
                        <span
                            className="text-align-center light-black-font"
                            onClick={this.prevDateSelectHandler.bind(this,dayDate)}
                            key={dayDate}
                            id={'d'+(n++)}
                        >
            {dayDate}
          </span>
                    ))}
                    {this.state.curDates.map((dayDate) => (
                        <span
                            className={
                                "text-align-center " +
                                (this.state.curDate.getDate() === dayDate &&
                                this.state.curDate.getMonth() === this.state.showDate.getMonth() &&
                                this.state.curDate.getFullYear() === this.state.showDate.getFullYear()
                                    ? "currentDate"
                                    : "")
                            }
                            onClick={this.curDateSelectHandler.bind(this,dayDate)}
                            id={(this.state.curDate.getDate() === dayDate &&
                            this.state.curDate.getMonth() === this.state.showDate.getMonth() &&
                            this.state.curDate.getFullYear() === this.state.showDate.getFullYear() && n++)
                                ? "today"
                                : 'd'+(n++)}
                            key={dayDate}

                        >
            {dayDate}
          </span>
                    ))}
                    {this.state.nextDates.map((dayDate) => (
                        <span
                            className="text-align-center light-black-font"
                            onClick={this.nextDateSelectHandler.bind(this,dayDate)}
                            key={dayDate}
                            id={'d'+(n++)}
                        >
            {dayDate}
          </span>
                    ))}
                </div>
                <div className="setDate-container">
                    <input className="setDate" type="text" id="date" placeholder="MM/DD/YYYY"/><button type="button" id="set" className="setDate-btn">Set</button>
                </div>
            </div>
        );
    }
}

export default Picker;
