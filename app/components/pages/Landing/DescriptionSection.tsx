type Props = {
  handleOpenAuthModal: (open: boolean) => void;
  backgroundColor: string;
};

const DescriptionSection = ({
  handleOpenAuthModal,
  backgroundColor,
}: Props) => {
  return (
    <section className="flex w-full items-center justify-between border-b border-black px-8 py-28">
      <p className="max-w-[55rem] text-3xl">
        Post-Room is your space for insight into articles and meaningful
        discussions. From deep analysis to personal stories, we cover a wide
        range of topics to keep you updated, inspired, and connected. Read,
        share, and engage with stories that matter. Join the conversation at
        Post-Room.
      </p>
      <button
        onClick={() => handleOpenAuthModal(true)}
        className="black-btn hidden items-center gap-3 rounded-full px-6 py-3 text-lg lg:flex"
      >
        Create my account
        <span
          style={{ backgroundColor: `rgb(${backgroundColor})` }}
          className="size-2 rounded-full"
        ></span>
      </button>
    </section>
  );
};

export default DescriptionSection;
