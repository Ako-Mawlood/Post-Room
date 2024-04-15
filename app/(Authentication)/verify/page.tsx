import Link from 'next/link';

const Verify = () => {
  return (
    <div className="min-h-screen flex items-start py-40 justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-12 text-center text-4xl font-extrabold text-black">
            Verify Your Account
          </h2>
          <p className="mt-4 text-center text-base text-gray-600">
            Please check your email and verify your account. Once verified, you can continue to use our services.
          </p>
        </div>
        <div className="flex justify-center">
          <Link className="mt-2 text-center text-sm bg-black text-white px-5 rounded-sm py-2 font-semibold hover:opacity-90" href="/">
              Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
