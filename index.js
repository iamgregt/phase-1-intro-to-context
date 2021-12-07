function createEmployeeRecord(array){
    let obj = {
     firstName : array[0],
     familyName : array[1],
     title : array[2],
     payPerHour : array[3],
     timeInEvents : [],
     timeOutEvents : [],
    }
    return obj
}

function createEmployeeRecords(arrayOfArrays){
    let employeeRecords = arrayOfArrays.map(employee => createEmployeeRecord(employee))
    console.log(employeeRecords)
    return employeeRecords
    
}

function createTimeInEvent(record, timeDate){
    let splitTimeDate = timeDate.split(' ')
    let dateSplit = splitTimeDate[0]
    let timeSplit = splitTimeDate[1]
    let timeInObj = {
        type: "TimeIn",
        date: dateSplit,
        hour: parseInt(timeSplit)
    }
    record.timeInEvents.push(timeInObj)
    return record
}

function createTimeOutEvent(record, timeDate){
    let splitTimeDate = timeDate.split(' ')
    let dateSplit = splitTimeDate[0]
    let timeSplit = splitTimeDate[1]
    let timeOutObj = {
        type: "TimeOut",
        date: dateSplit,
        hour: parseInt(timeSplit)
    }
    record.timeOutEvents.push(timeOutObj)
    return record
}

function hoursWorkedOnDate(record, date){
    let timeIn = record.timeInEvents.find(e => {
        return e.date === date
    })
    let timeOut = record.timeOutEvents.find(e => {
        return e.date === date
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, date){
    let pay = hoursWorkedOnDate(record, date) * record.payPerHour
    return parseFloat(pay.toString())

}

function allWagesFor(record){
    let dates = record.timeInEvents.map(e =>{
        return e.date
    })
    let pay = dates.reduce((total, date) => {
        return total + wagesEarnedOnDate(record, date)
    }, 0)
    return pay
}

function calculatePayroll(arrayOfEmployees){
   console.log(arrayOfEmployees)
   return arrayOfEmployees.reduce((total, e) => {
       return total + allWagesFor(e)
   }, 0)
}