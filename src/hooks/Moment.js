import moment from 'moment'
import { useEffect, useState } from 'react'

const useCountDown = targetDate => {
  const [timeLeft, setTimeLeft] = useState(
    moment.duration(moment(targetDate).diff(moment()))
  )

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment()
      const duration = moment.duration(moment(targetDate).diff(now))

      setTimeLeft(duration)
      if (duration.asSeconds() <= 0) {
        console.log('Countdown finished')
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return {
    days: timeLeft.days(),
    hours: timeLeft.hours(),
    minutes: timeLeft.minutes(),
    seconds: timeLeft.seconds()
  }
}

export default useCountDown
