"use client"

import { useState } from "react"

export default function ConfirmStep({ bookingData, setBookingStep, onNavigate }) {
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const packageNames = {
    single: "Single Session",
    "full-body": "Full-Body Bundle",
    subscription: "6-Month Plan",
  }

  const handleConfirm = async () => {
    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setConfirmed(true)
      setSubmitting(false)
    }, 2000)
  }

  const downloadCalendar = () => {
    if (!bookingData.date || !bookingData.time) return

    const [hours, minutes] = bookingData.time.split(":").map(Number)
    const startDate = new Date(bookingData.date)
    startDate.setHours(hours, minutes, 0, 0)
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000)

    const formatDate = (date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Luma Laser//Booking//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@luma-laser`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:Laser Hair Removal — ${packageNames[bookingData.pkg]}`,
      "LOCATION:Luma Laser Clinic",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n")

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "appointment.ics"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <span className="text-2xl">✅</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Appointment Confirmed!</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We've sent a confirmation to your email. Add it to your calendar below, or message us with questions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={downloadCalendar}
              className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
            >
              📅 Add to Calendar
            </button>
            <a
              href="https://wa.me/1234567890?text=Hi%20Luma%20Laser%2C%20I%20have%20a%20question%20about%20my%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 text-center"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          <button
            onClick={() => onNavigate("home")}
            className="rounded-md bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Review & Confirm</h1>
        <p className="mt-2 text-gray-600">Please review your appointment details before confirming.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-medium">
            ✓
          </div>
          <span className="text-gray-900">Package</span>
          <div className="h-px flex-1 bg-gray-200"></div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-medium">
            ✓
          </div>
          <span className="text-gray-900">Date & Time</span>
          <div className="h-px flex-1 bg-gray-200"></div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-medium">
            ✓
          </div>
          <span className="text-gray-900">Details</span>
          <div className="h-px flex-1 bg-gray-200"></div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-medium">
            4
          </div>
          <span className="text-gray-900">Confirm</span>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 mb-8">
        <h3 className="font-medium text-gray-900 mb-4">Appointment Summary</h3>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Package:</span>
            <span className="font-medium">{packageNames[bookingData.pkg]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{bookingData.date?.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{bookingData.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{bookingData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{bookingData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{bookingData.phone}</span>
          </div>
          {bookingData.notes && (
            <div className="pt-2 border-t">
              <span className="text-gray-600 block mb-1">Notes:</span>
              <span className="text-sm">{bookingData.notes}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setBookingStep(3)}
          className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={submitting}
          className="rounded-md bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Booking...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </div>
  )
}
