import about from "../components/hero/PriImagPereview.png"

export const AboutUs = () => {
  return (
    <>
      <div className=" about-Us lg:mb-10">
        <img
          src="https://images.pexels.com/photos/8942900/pexels-photo-8942900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="sm:w-1/3 about-image bg-[#BD9E82]"
        />
        <div className="about-content">
          <p className="text-m font-bold text-gradient mb-3 md:text-l md:leading-[2rem] lg:text-xl lg:leading-[2rem] p-10">
            Welcome to Lion Chocolates, where bold flavors and exquisite craftsmanship meet. Indulge
            in our luxurious range of chocolates, crafted with passion and precision to deliver an
            unforgettable taste experience.
          </p>
        </div>
      </div>
      <div className="about-Us  flex-row-reverse">
        <img src={about} className="sm:w-1/3 about-image " />
        <div className="about-content">
          <p className="text-m font-bold text-gradient md:text-l md:leading-[2rem] lg:text-xl lg:leading-[2rem] p-10">
            Welcome to Lion Chocolates, where bold flavors and exquisite craftsmanship meet. Indulge
            in our luxurious range of chocolates, crafted with passion and precision to deliver an
            unforgettable taste experience.
          </p>
        </div>
      </div>
    </>
  )
}
