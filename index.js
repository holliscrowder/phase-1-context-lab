/* Your Code Here */
// createEmployeeRecord & createEmployeeRecords are the same as before
function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employees) {
  let employeeRecords = [];
  for (const employee of employees) {
    employeeRecords.push(createEmployeeRecord(employee));
  }
  return employeeRecords;
}

const createTimeInEvent = function (dateStamp) {
  let hour = parseInt(dateStamp.substring(dateStamp.length - 4));
  let date = dateStamp.substring(0, dateStamp.length - 5);
  let newEvent = {
    type: "TimeIn",
    hour: hour,
    date: date,
  };

  this.timeInEvents.push(newEvent);
  return this;
};

const createTimeOutEvent = function (dateStamp) {
  let hour = parseInt(dateStamp.substring(dateStamp.length - 4));
  let date = dateStamp.substring(0, dateStamp.length - 5);
  let newEvent = {
    type: "TimeOut",
    hour: hour,
    date: date,
  };

  this.timeOutEvents.push(newEvent);
  return this;
};

const hoursWorkedOnDate = function (date) {
  let timeInHour = 0;
  let timeOutHour = 0;
  for (const event of this.timeInEvents) {
    if (event.date === date) {
      timeInHour = event.hour;
    }
  }
  for (const event of this.timeOutEvents) {
    if (event.date === date) {
      timeOutHour = event.hour;
    }
  }
  return (timeOutHour - timeInHour) / 100;
};

const wagesEarnedOnDate = function (date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.filter((record) => {
    return record.firstName === firstName;
  })[0];
}

function calculatePayroll(records) {
  const initialValue = 0;
  const payroll = records.reduce((accumulator, record) => {
    return accumulator + allWagesFor.call(record);
  }, initialValue);
  return payroll;
}
