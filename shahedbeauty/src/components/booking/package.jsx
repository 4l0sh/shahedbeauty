"use client"

export default function PackageStep({ bookingData, setBookingData, setBookingStep }) {
  const packages = [
    {
      id: "single",
      name: "Single Session",
      price: "$89",
      description: "One area • 15–30 min",
      icon: "✨",
    },
    {
      id: "full-body",
      name: "Full-Body Bundle",
      price: "$299",
      description: "Multiple areas • 60–90 min",
      icon: "📦",
    },
    {
      id: "subscription",
      name: "6-Month Plan",
      price: "$79/mo",
      description: "Monthly • Flexible areas",
      icon: "✅",
    },
  ]

  const selectPackage = (pkgId) => {
    setBookingData({ ...bookingData, pkg: pkgId })
  }

  const canContinue = bookingData.pkg !== ""

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Choose Your Package</h1>
        <p className="mt-2 text-gray-600">Select the treatment plan that works best for you.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-medium">
            1
          </div>
          <span className="text-gray-900">Package</span>
          <div className="h-px flex-1 bg-gray-200"></div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium">
            2
          </div>
          <span className="text-gray-500">Date & Time</span>
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

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => selectPackage(pkg.id)}
            className={`rounded-lg border p-6 text-left transition ${
              bookingData.pkg === pkg.id ? "border-emerald-600 bg-emerald-50" : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="text-2xl mb-2">{pkg.icon}</div>
            <div className="font-medium text-gray-900 mb-1">{pkg.name}</div>
            <div className="text-xl font-semibold text-emerald-600 mb-2">{pkg.price}</div>
            <div className="text-sm text-gray-600">{pkg.description}</div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setBookingStep(2)}
          disabled={!canContinue}
          className="rounded-md bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Date & Time →
        </button>
      </div>
    </div>
  )
}
