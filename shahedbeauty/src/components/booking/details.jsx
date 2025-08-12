"use client"

export default function DetailsStep({ bookingData, setBookingData, setBookingStep }) {
  const updateField = (field, value) => {
    setBookingData({ ...bookingData, [field]: value })
  }

  const canContinue =
    bookingData.name.length > 1 && /\S+@\S+\.\S+/.test(bookingData.email) && bookingData.phone.length >= 7

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Your Details</h1>
        <p className="mt-2 text-gray-600">Tell us a bit about yourself so we can prepare for your visit.</p>
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
            3
          </div>
          <span className="text-gray-900">Details</span>
          <div className="h-px flex-1 bg-gray-200"></div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium">
            4
          </div>
          <span className="text-gray-500">Confirm</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={bookingData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Alex Johnson"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={bookingData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={bookingData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
          <textarea
            value={bookingData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Tell us about your goals, sensitive areas, or any questions you have."
            rows={8}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setBookingStep(2)}
          className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          onClick={() => setBookingStep(4)}
          disabled={!canContinue}
          className="rounded-md bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review & Confirm →
        </button>
      </div>
    </div>
  )
}
