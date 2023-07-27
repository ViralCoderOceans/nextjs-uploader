import React, { useState } from 'react'
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const SchedulePost = ({ isSchedule, setIsSchedule, setDateTime }) => {
  const [value] = useState(dayjs(new Date()));
  return (
    <>
      <div className='mt-4'>
        <label className="label">
          <span className="text-base font-medium">Scheduling options :</span>
        </label>
        <div className="flex justify-center gap-1 bg-base-200 p-1 rounded-lg">
          <button onClick={() => setIsSchedule(false)} className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${isSchedule ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} rounded-lg transition-all`}>
            Publish now
          </button>
          <button onClick={() => setIsSchedule(true)} className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${!isSchedule ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}>
            Schedule
          </button>
        </div>
      </div>
      {isSchedule &&
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              className='bg-white rounded-lg border border-neutral'
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={value}
              onChange={(e) => {
                const scheduledTimestamp = new Date(e.$d).getTime() / 1000
                console.log('scheduledTimestamp: ', scheduledTimestamp);
                setDateTime(scheduledTimestamp)
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      }
    </>
  )
}

export default SchedulePost