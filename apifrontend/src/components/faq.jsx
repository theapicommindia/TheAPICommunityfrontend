import React from 'react'

const faq = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6 gap-6">
              <div className="flex flex-col justify-center items-center px-6 gap-2">
                <div className="flex flex-row gap-2">
                  <CalendarDays />
                  <h2>POSTMAN @ Jun 2024</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <TicketMinus />
                  <h2>POSTMAN @ Jun 2024</h2>
                </div>
                <div className="flex flex-row gap-2">
                  <MapPin />
                  <h2>POSTMAN @ Jun 2024</h2>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center px-6 gap-2">
                <button className="w-full bg-black text-white">Go to Detail</button>
                <button className="bg-gray-100 text-black">Register</button>
              </div>
            </div>
  )
}

export default faq
