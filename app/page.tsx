import Image from "next/image";
import Navbar from "./Components/Navbar";
export default function Home() {

  return(
    <>
     <Navbar  />
     <Image  aria-disabled className="absolute disabled object-cover pointer-events-none select-none h-screen top-0 right-0 z-0 " src="frame.svg" width={1097} height={853} alt="frame" />
     <div aria-disabled className=" blur-[300px] w-[44rem] h-[44rem] bg-[#98AEF1] rounded-full absolute top-[-200px] left-[-200px] z-0"></div>
      <h1 className=" absolute top-[13%] font-ClashDisplay right-1/2 translate-x-1/2 translate-y-1/2 text-6xl font-semibold text-darkPurple ">Blogs Made deffrently</h1>
      <div className="absolute flex justify-center items-end gap-10 h-[400px] overflow-hidden w-[132%] bottom-2 left-[-200px]">

        <div className="w-[28%] text-darkPurple rounded-3xl bg-white flex flex-col justify-start items-start pt-10 pb-5 px-7 text-ellipsis h-[300px]">
            <h1 className=" text-6xl font-extrabold">bolgs name</h1>
            <p  className=" py-3">Feb 9,2023 .4min</p> 
            <p  className=" text-[12px]">Lorem ipsum dolor, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, vero. Hic vitae quasi cumque illo, consequuntur voluptatibus reiciendis veniam accusamus ipsam ipsum sit amet consectetur adipisicing elit. Aut, dolorum dolore ut nostrum eius, consectetur consequatur ea animi corporis adipisci eos voluptatum sunt omnis corrupti nihil sapiente fugit doloribus suscipit.</p>
        </div>

        <div className="w-[28%] mb-10 text-white rounded-3xl bg-darkPurple flex flex-col justify-start items-start  pt-10 pb-5 px-7 h-[300px]  bottom-10">
            <h1 className=" text-6xl font-extrabold">bolgs name</h1>
            <p  className=" py-3">Feb 9,2023 .4min</p> 
            <p  className="text-[12px]">Lorem ipsum dolor, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, vero. Hic vitae quasi cumque illo, consequuntur voluptatibus reiciendis veniam accusamus ipsam ipsum sit amet consectetur adipisicing elit. Aut, dolorum dolore ut nostrum eius, consectetur consequatur ea animi corporis adipisci eos voluptatum sunt omnis corrupti nihil sapiente fugit doloribus suscipit.</p>
        </div>

        <div className=" w-[28%] text-darkPurple rounded-3xl bg-lightPurple flex flex-col justify-start items-start pt-10 pb-5 px-7 h-[300px]">
            <h1 className=" text-6xl font-extrabold">bolgs name</h1>
            <p  className=" py-3">Feb 9,2023 .4min</p> 
            <p  className="text-[12px]">Lorem ipsum dolor, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, vero. Hic vitae quasi cumque illo, consequuntur voluptatibus reiciendis veniam accusamus ipsam ipsum sit amet consectetur adipisicing elit. Aut, dolorum dolore ut nostrum eius, consectetur consequatur ea animi corporis adipisci eos voluptatum sunt omnis corrupti nihil sapiente fugit doloribus suscipit.</p>
        </div>

      </div>
    </>
  );
}