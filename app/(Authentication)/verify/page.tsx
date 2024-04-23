import Link from 'next/link';

const Verify = () => {
  return (
    <div className="flex flex-col text-center mt-24 md:mt-0 md:justify-center items-center h-screen w-full space-y-8">

      <h2 className="text-4xl font-extrabold text-black">
        Verify Your Account
      </h2>
      <p className="text-gray-600">
        Please check your email and verify your account. Once verified, you can continue to use our services.
      </p>
      <Link className="text-sm bg-black text-white px-5 rounded-sm py-2 font-semibold hover:opacity-90" href="/">
        Go back to home
      </Link>

    </div>

  );
};

export default Verify;
