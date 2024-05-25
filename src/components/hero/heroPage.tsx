import React from "react"

import row1 from "../hero/heroImage2.jpg"
import row2 from "../hero/heroImage1.jpg"
import row3 from "../hero/heroImage4.jpg"

export const Hero = () => {
  return (
    <section className="haro-page max-w-screen-3xl flex flex-col-reverse gap-12 items-center mx-auto py-16 px-6 md:flex-row">
      <div className="flex-1 text-center md:text-left ">
        <h2 className="text-[#f66b0ec7]  text-3xl leading-[4rem] font-bold md:text-4xl md:leading-[10rem] lg:text-6xl lg:leading-[14rem]">
          LOIN Chocolate
        </h2>
        <p className="text-m font-bold text-gradient mb-3 md:text-l md:leading-[2rem] lg:text-xl lg:leading-[2rem]">
          {/* text-sm leading-6 text-[primary] mb-6 md:w-4/5"> */}
          Treat yourself to a world of flavor with our exclusive collection of luxurious chocolates.
        </p>
        <button className="primary-btn">Explore Our Project</button>
      </div>

      <div className=" flex gap-2 justify-center md:gap-3 lg:gap-5">
        <img className=" hero-img rounded" src={row3} />
        <img className="mt-[5%] hero-img rounded" src={row2} />
        <img className=" hero-img rounded" src={row1} />
      </div>
    </section>
  )
}
