var eventCalendar = (function() {
    var _evCal = {};

    function MyEvent(title, startDay, startTime) {
        return {
            title: title,
            startDay: startDay,
            startTime: startTime,
            duration: 1
        };
    }
    var currStartDate, currEndDate;
    var oneDayMillis = 24 * 60 * 60 * 1000;
    var eventMap = {};
    var dayArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var timeArr = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
        "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
    ];
    var monthArr = ["Jan", 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    _evCal.intializeCalender = function(dt) {
        if (!dt) {
            dt = new Date();
        }
        var dayOfWeek = dt.getDay();

        var startDate = new Date(dt.getTime() - oneDayMillis * dayOfWeek);
        var endDate = new Date(startDate.getTime() + oneDayMillis * 6);
        var currentWeekStr = getDateMonthString(startDate) + ' -  ' + getDateMonthString(endDate);
        document.querySelector(".currentWeek").innerHTML = currentWeekStr;
        var iter;
        var calContainer = document.querySelectorAll('.calenderContainer')[0],
            currDate, row, cell;
        calContainer.innerHTML = "";
        row = document.createElement("div");
        row.className = "row";
        cell = document.createElement("div");
        cell.className = "col col-time row-heading";
        row.appendChild(cell);
        for (iter = 0; iter < 7; iter++) {
            row.appendChild(createHeading(new Date(startDate.getTime() + oneDayMillis * iter)));
        }
        calContainer.appendChild(row);
        for (iter = 0; iter < 24; iter++) {
            calContainer.appendChild(createRow(iter, startDate));
        }
        currStartDate = startDate;
        currEndDate = endDate;
    }

    function createRow(iter1, startDate) {
        var row = document.createElement("div"),
            iter;
        row.className = "row";
        row.appendChild(createTimeCell(iter1));
        for (iter = 0; iter < 7; iter++) {
            row.appendChild(createCell(iter1, iter, new Date(startDate.getTime() + oneDayMillis * iter)));
        }
        return row;
    }

    function createTimeCell(iter1) {
        var cell = document.createElement("div");
        cell.className = "col col-time";
        cell.innerHTML = timeArr[iter1];
        return cell;
    }

    function createCell(iter1, iter, dt) {
        var cell = document.createElement("div"),
            eventClass;
        var idstr = getDateString(dt) + "-" + iter1;
        if (eventMap.hasOwnProperty(idstr)) {
            eventClass = 'event';
            cell.innerText = eventMap[idstr].title;
        } else {
            eventClass = '';
        }
        cell.className = "col col-day cell " + eventClass;
        cell.setAttribute("id", idstr);
        return cell;
    }

    function createHeading(dt) {
        var cell = document.createElement("div");
        cell.className = "col col-day row-heading";
        var sp = document.createElement("span");
        sp.className = "day";
        sp.innerText = dayArr[dt.getDay()];
        cell.appendChild(sp);
        sp = document.createElement("span");
        sp.className = "date";
        sp.innerText = getDateMonthString(dt);
        cell.appendChild(sp);
        return cell;
    }

    function getDateString(dt) {
        var date = dt.getDate();
        var month = dt.getMonth() + 1;
        var yr = dt.getFullYear();
        return "" + date + month + yr;
    }

    function prev() {
        intializeCalender(new Date(currStartDate.getTime() - oneDayMillis));
    }

    function next() {
        intializeCalender(new Date(currEndDate.getTime() + oneDayMillis));
    }

    function getDateMonthString(dt) {
        var date = dt.getDate();
        var month = monthArr[dt.getMonth()];
        return date + ' ' + month;
    }

    function calenderClickListener(ev) {
        var targetElem = ev.target;
        var targetClass = targetElem.className,
            id = targetElem.id,
            arr, evnt,
            dt, hr, title;
        arr = id ? id.split('-') : [];
        dt = arr[0];
        hr = arr[1];
        if (targetClass.indexOf('cell') === -1) {
            ev.stopPropagation();
            ev.preventDefault();
            return;
        } else if (targetClass.indexOf('event') != -1) {
            delete eventMap[id];
            targetElem.className = targetClass.replace('event', '');
            targetElem.innerText = '';
        } else {
            title = prompt("Enter the title of Event", "Sample Event");
            if (title) {
                evnt = new MyEvent(title, dt, hr);
                eventMap[id] = evnt;
                targetElem.className = targetClass + ' event';
                targetElem.innerText = title;
            }
        }
    }

    document.querySelector('.calenderContainer').addEventListener('click', calenderClickListener);
    return _evCal;
})();

eventCalendar.intializeCalender();