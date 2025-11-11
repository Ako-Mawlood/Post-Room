import Link from "next/link";

const TermsPage = () => {
  return (
    <>
      <nav>
        <Link
          href="/"
          className="m-4 flex items-center font-PT text-lg font-bold sm:text-2xl"
        >
          <h1>Post-Room</h1>
        </Link>
      </nav>
      <div className="flex w-full flex-col gap-4 rounded-sm p-5 opacity-80 md:mx-auto md:my-10 md:w-2/3 md:bg-accent md:p-10">
        <h1 className="font-PT text-4xl md:text-7xl lg:text-8xl">
          Post-Room&apos;s Terms of Service
        </h1>

        <p className="text-accent-foreground">Last updated: August 29, 2024</p>
        <br />
        <h1 className="font-PT text-2xl font-semibold">Introduction:</h1>
        <p>
          Welcome to Post-Room! These Terms of Service govern your use of our
          website, applications, and other services provided by Post-Room. By
          accessing or using our services, you agree to be bound by these terms
          and all applicable laws and regulations. If you do not agree with
          these terms, please do not use our services. We may update these terms
          periodically, so we encourage you to review them regularly to stay
          informed of any changes.
        </p>

        <h1 className="font-PT text-2xl font-semibold">Acceptance of Terms:</h1>
        <p>
          By accessing or using the Post-Room website or any other services we
          provide, you agree to comply with and be bound by these Terms of
          Service. Your continued use of our services signifies your acceptance
          of any changes or modifications to these terms. It is your
          responsibility to review these terms periodically for any updates or
          amendments.
        </p>

        <h1 className="font-PT text-2xl font-semibold">
          User Responsibilities:
        </h1>
        <p>
          As a user of Post-Room, you are responsible for your own actions and
          the content you submit or post on our website. You agree to use our
          services only for lawful purposes and in a manner that does not
          infringe upon the rights of others. This includes, but is not limited
          to, avoiding fraudulent activities, not posting harmful or defamatory
          content, and respecting other user&apos;s rights and privacy.
        </p>

        <h1 className="font-PT text-2xl font-semibold">
          Content Ownership and Intellectual Property:
        </h1>
        <p>
          All content available on Post-Room, including text, images, graphics,
          logos, and software, is the property of Post-Room or its content
          providers and is protected by copyright, trademark, and other
          intellectual property laws. You may not reproduce, distribute, or
          create derivative works from any content on our site without obtaining
          prior written permission from Post-Room or the respective content
          owner. Unauthorized use of our content may result in legal action.
        </p>

        <h1 className="font-PT text-2xl font-semibold">
          Limitation of Liability:
        </h1>
        <p>
          Post-Room is not liable for any direct, indirect, incidental, or
          consequential damages that may arise from your use or inability to use
          our services. This includes, but is not limited to, damages for loss
          of data, loss of profits, or other intangible losses. We do not
          guarantee that our services will be uninterrupted, error-free, or free
          of viruses or other harmful components. We strive to provide accurate
          and reliable information but cannot warrant its completeness or
          reliability.
        </p>

        <h1 className="font-PT text-2xl font-semibold">Governing Law:</h1>
        <p>
          These Terms of Service are governed by and construed in accordance
          with the laws of the Kurdistan Region. Any disputes arising out of or
          relating to these terms or your use of our services will be resolved
          in the courts located in the Kurdistan Region. By using our services,
          you consent to the jurisdiction and venue of these courts.
        </p>

        <h1 className="font-PT text-2xl font-semibold">
          Modifications to Terms:
        </h1>
        <p>
          We reserve the right to modify these Terms of Service at any time.
          When we make significant changes, we will update this page with the
          new terms and notify you as appropriate. It is your responsibility to
          check this page periodically for any updates. Continued use of our
          services after any changes indicates your acceptance of the new terms.
        </p>

        <h1 className="font-PT text-2xl font-semibold">Termination:</h1>
        <p>
          We reserve the right to terminate or suspend your access to our
          website and services at our sole discretion, without notice, for any
          reason, including but not limited to a breach of these Terms of
          Service. Upon termination, all provisions of these terms which by
          their nature should survive will remain in effect.
        </p>

        <h1 className="font-PT text-2xl font-semibold">Contact Us:</h1>
        <p>
          If you have any questions, concerns, or feedback regarding these Terms
          of Service or any aspect of our website and services, please contact
          us at <strong>ako.mawlood01@gmail.com</strong>. We are here to address
          your inquiries and ensure your experience with Post-Room is positive
          and satisfactory.
        </p>
      </div>
    </>
  );
};

export default TermsPage;
