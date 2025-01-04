import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F1DBE2]">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Access Forbidden</h1>
        <p className="text-xl text-gray-600 mb-8">Sorry, you don't have permission to access this page.</p>
        <Link 
          href="/" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

