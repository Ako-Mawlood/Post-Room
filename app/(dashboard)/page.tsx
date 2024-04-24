import Image from "next/image";
import ArtImage from "../../public/ArtImage.jpg"
export default function HomePage() {
  return (
    <>
      <section className="flex flex-col md:flex-row mt-4 px-2 justify-around items-center">
        <div className="md:w-5/12 flex flex-col justify-center items-center gap-10 md:gap-20 text-center">
          <h1 className="font-semibold text-3xl md:text-[2.5vw] leading-none">Welcome to Post Room Where Words Weave the Fabric of Inspiration</h1>
          <p className="text-xl md:text-[1.5vw]">Post Room offers curated <span className="font-extrabold">articles</span>,<span className="font-extrabold">blogs</span>, and <span className="font-extrabold">quotes</span>, each contributing to a tapestry of discovery in a realm where storytelling intertwines with profound ideas.</p>
        </div>
        <Image
          className="md:w-2/5 bg-gray-900"
          src={ArtImage}
          alt="art image"
          width={500}
          height={500}
          placeholder="blur"
        />
      </section>

    </>
  )
}
