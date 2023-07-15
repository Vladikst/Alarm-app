const currentTime = document.querySelector('h1'),
  content = document.querySelector('.content'),
  selectMenu = document.querySelectorAll('select'),
  setAlarmBtn = document.querySelector('button')

for (let i = 1; i <= 12; i++) {
  const value = i.toString().padStart(2, '0'); // Adding leading zero if needed
  const option = document.createElement('option');
  option.value = value;
  option.textContent = value;
  selectMenu[0].appendChild(option);
}

for (let i = 1; i <= 59; i++) {
  const value = i.toString().padStart(2, '0'); // Adding leading zero if needed
  const option = document.createElement('option');
  option.value = value;
  option.textContent = value;
  selectMenu[1].appendChild(option);
}

const ampmOptions = ['AM', 'PM'];
for (const optionValue of ampmOptions) {
  const option = document.createElement('option');
  option.value = optionValue;
  option.textContent = optionValue;
  selectMenu[2].appendChild(option);
}

let alarmTime,
  isAlarmSet,
  ringtone = new Audio('./files/ringtone.mp3')

currentTime.innerHTML = '<img src="./files/react.gif"/>'

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = 'AM'

  if (h >= 12) {
    h = h - 12
    ampm = 'PM'
  }

  h = h == 0 ? (h = 12) : h
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s

  currentTime.innerText = `${h}:${m}:${s} ${ampm}`

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play()
    ringtone.loop = true
  }
}, 1000)


function setAlarm() {
  if (isAlarmSet) {
    alarmTime = ''
    ringtone.pause()
    selectMenu.forEach(select => select.selectedIndex = 0)
    content.classList.remove('disable')
    setAlarmBtn.innerText = 'Set Alarm'
    return (isAlarmSet = false)
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`

  if (time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')) {
    const errorNotFilledData = () => {
      selectMenu.forEach(select => select.classList.add('red-vibrate'))
      alert('Please select all data to set an alarm')
    }
    return errorNotFilledData()
  } else {
    selectMenu.forEach(select => select.classList.remove('red-vibrate'))
  }

  alarmTime = time
  isAlarmSet = true
  content.classList.add('disable')
  setAlarmBtn.innerText = 'Clear Alarm'
}

setAlarmBtn.addEventListener('click', setAlarm)
