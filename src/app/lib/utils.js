// get slots for today 

export const handleDay = (_day, _time) => {
    let date = ''
    if (_day == 'today') {
        let newDate = new Date()
        date = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }
    else {
        let newDate = new Date()
        date = `${newDate.getDate() + 1} /${newDate.getMonth()}/${newDate.getFullYear()}`
    }
    return { day: date, time: _time }
}