"use client"

import { useState } from "react"

export default function DateStep({ bookingData, setBookingData, setBookingStep }) {
  const [selectedDate, setSelectedDate] = useState(bookingData.date)
  const [selectedTime, setSelectedTime] = useState(bookingData.time)

  const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"]

  // Simple calendar - just next 14 days
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const availableDates = getAvailableDates()

  const selectDate = (date) => {
    setSelectedDate(date)
    setBookingData({ ...bookingData, date })
  }

  const selectTime = (time) => {
    setSelectedTime(time)
    setBookingData({ ...bookingData, time })
  }

  const canContinue = selectedDate && selectedTime

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Select Date & Time</h1>
        <p className="mt-2 text-gray-600">Choose when you'd like to come in for your treatment.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-medium">
            ✓
          </div>
          <span className="text-gray-900">Package</span>
          <div className="h-px flex-1 bg-gray-200"></div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-medium">
            2
          </div>
          <span className="text-gray-900">Date & Time</span>
          <div className="h-px flex-1 bg-gray-200"></div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium">
            3
          </div>
          <span className="text-gray-500">Details</span>
          <div className="h-px flex-1 bg-gray-200"></div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium">
            4
          </div>
          <span className="text-gray-500">Confirm</span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Available Dates</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableDates.map((date, index) => (
              <button
                key={index}
                onClick={() => selectDate(date)}
                className={`rounded-md border p-3 text-sm transition ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="font-medium">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div>{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Available Times</h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => selectTime(time)}
                className={`rounded-md border p-3 text-sm transition ${
                  selectedTime === time ? "border-emerald-600 bg-emerald-50" : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>Typical session: 30–60 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span>Free patch test for first-time clients</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setBookingStep(1)}
          className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          onClick={() => setBookingStep(3)}
          disabled={!canContinue}
          className="rounded-md bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Your Details →
        </button>
      </div>
    </div>
  )
}
