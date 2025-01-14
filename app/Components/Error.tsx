import Image from "next/image";

const Error = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-5 md:flex-row">
      <Image
        className="m-10 w-64 md:order-2"
        src="/assets/error.svg"
        width={400}
        height={400}
        alt="Not-found"
      />
      <div className="flex w-96 flex-col items-center gap-8 text-center">
        <h1 className="text-3xl md:text-5xl">Error Occurred</h1>
        <p>
          Something went wrong while fetching the data. Please check your
          connection and try again.”
        </p>
      </div>
    </div>
  );
};

export default Error;
