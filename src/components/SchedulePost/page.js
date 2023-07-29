import React, { useEffect, useMemo, useState } from 'react'
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const SchedulePost = ({ isSchedule, setIsSchedule, setDateTime, setSchedule, setPublishNow }) => {
  const [value, setValue] = useState(dayjs(new Date()))
  const [maxValue, setMaxValue] = useState()
  const [minValue, setMinValue] = useState()
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const scheduledTimestamp = Math.floor(new Date().getTime())
    setMaxValue(new Date(scheduledTimestamp + 2505595000))
    setMinValue(new Date(scheduledTimestamp + 1500000))
    setValue(dayjs(new Date(scheduledTimestamp + 1500000)))
  }, [])

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Scheduled posts need to be shared between 25 minutes and 29 days from when you create them.';
      }

      case 'invalidDate': {
        return 'Your date and time are not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  return (
    <>
      <div className='mt-4'>
        <label className="label">
          <span className="text-base font-medium">Scheduling options :</span>
        </label>
        <div className="flex justify-center gap-1 bg-base-200 p-1 rounded-lg">
          <button
            onClick={() => {
              setPublishNow()
              setIsSchedule(false)
            }}
            className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${isSchedule ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} rounded-lg transition-all`}
          >
            Publish now
          </button>
          <button
            onClick={() => {
              setSchedule()
              setIsSchedule(true)
            }}
            className={`cursor-pointer basis-1/2 flex justify-center text-lg font-medium py-1 ${!isSchedule ? 'hover:bg-neutral hover:text-white' : 'bg-neutral text-white'} hover:bg-neutral hover:text-white rounded-lg transition-all`}
          >
            Schedule
          </button>
        </div>
      </div>
      {isSchedule &&
        <>
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
                maxDateTime={dayjs(maxValue)}
                minDateTime={dayjs(minValue)}
                onChange={(e) => {
                  // setIsValid(true)
                  const scheduledTimestamp = Math.floor(new Date(e?.$d).getTime() / 1000)
                  setDateTime(scheduledTimestamp)
                }}
                onError={(newError) => setError(newError)}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
                onOpen={() => {
                  const scheduledTimestamp = Math.floor(new Date().getTime())
                  setMaxValue(new Date(scheduledTimestamp + 2505595000))
                  setMinValue(new Date(scheduledTimestamp + 1500000))
                }}
                disablePast={true}
              />
            </DemoContainer>
          </LocalizationProvider>
          {/* {!isValid && <p className='text-red-500 text-sm pt-1'>Scheduled posts need to be shared between 25 minutes and 29 days from when you create them.</p>} */}
        </>
      }
    </>
  )
}

export default SchedulePost