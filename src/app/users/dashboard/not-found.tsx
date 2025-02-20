
export default function NotFoundPage() {
  return (
    <div className="loading-page">
      <div className="loading-page__container">
        <section className="flex  justify-start items-start gap-1">
          {/* <Sidebar /> */}
          <div className="w-5/6 h-full gap-3 bg-second_background_color min-h-screen rounded p-3 flex justify-start items-start flex-col flex-wrap">
            {/* {children} */}
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <h1 className="text-3xl font-bold text-gray-900">404</h1>
              <h2 className="text-2xl font-bold text-red-900">نعتذر لكم !! هذا المسار غير موجود</h2>

            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
