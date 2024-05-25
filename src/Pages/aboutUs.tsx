import about from "../components/hero/PriImagPereview.png"

export const AboutUs = () => {
  return (
    <>
      <div className="about-Us">
        <img src={about} className="about-image bg-[#112B3C]" />
        <div className="about-content">
          <p className="text-m font-bold text-gradient mb-3 md:text-l md:leading-[2rem] lg:text-xl lg:leading-[2rem] p-10">
            Welcome to Lion Chocolates, where bold flavors and exquisite craftsmanship meet. Indulge
            in our luxurious range of chocolates, crafted with passion and precision to deliver an
            unforgettable taste experience.
          </p>
        </div>
      </div>
    </>
  )
}
