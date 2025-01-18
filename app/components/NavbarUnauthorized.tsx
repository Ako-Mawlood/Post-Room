"use client";

import Logo from "./ui/Logo";

interface NavbarUnauthorizedProps {
  handleOpenAuthModal: (isNewUser: boolean) => void;
}

const NavbarUnauthorized = ({
  handleOpenAuthModal,
}: NavbarUnauthorizedProps) => {
  return (
    <nav className="sticky left-0 top-0 z-50 flex h-[5.5rem] w-full items-center justify-between border-b border-black bg-neutral-50 bg-opacity-90 p-6 backdrop-blur">
      <Logo href="#" />

      <div className="flex gap-4 text-sm font-light">
        <button
          onClick={() => handleOpenAuthModal(false)}
          className="rounded-full border border-black px-4 py-2"
        >
          Sign in
        </button>

        <button onClick={() => handleOpenAuthModal(true)} className="black-btn">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default NavbarUnauthorized;
