import Link from "next/link";
import { CgEricsson } from "react-icons/cg";

const PrivacyPage = () => {
  return (
    <>
      <nav>
        {" "}
        <Link
          href="/"
          className="m-4 flex items-center font-PT text-lg font-bold sm:text-2xl"
        >
          <CgEricsson size={25} />
          <h1>Post-Room</h1>
        </Link>
      </nav>
      <div className="flex w-full flex-col gap-4 rounded-sm p-5 opacity-80 md:mx-auto md:my-10 md:w-2/3 md:bg-accent md:p-10">
        <h1 className="font-PT text-4xl md:text-7xl lg:text-8xl">
          Post-Room&apos;s Privacy Policy
        </h1>

        <p className="text-accent-foreground">Last updated: August 29, 2024</p>
        <br />
        <h1 className="font-PT text-2xl font-semibold">Introduction</h1>
        <p>
          Welcome to Post-Room! At Post-Room, we prioritize the privacy and
          security of our users. This Privacy Policy outlines the types of
          personal information that is received and collected by us and how it
          is used. By using our website, you consent to the practices described
          in this policy. We are committed to ensuring your privacy is protected
          and that your personal information is handled responsibly and in
          compliance with relevant privacy laws and regulations.
        </p>

        <h1 className="font-PT text-2xl font-semibold">
          Information We Collect:
        </h1>
        <p>
          We collect information from you when you visit our site, register, log
          in, or interact with our services. This information may include
          personal details such as your name, email address, phone number, and
          any other information you voluntarily provide. Additionally, we gather
          technical data automatically through cookies and other tracking
          technologies. This includes your IP address, browser type, operating
          system, and information about your visit, such as the pages you viewed
          and the links you clicked. This data helps us understand how you use
          our website and improve your user experience.
        </p>

        <h1 className="font-PT text-2xl font-semibold">
          How We Use Your Information:
        </h1>
        <p>
          The information we collect is used for various purposes, including:
          <ol>
            <li>Enhancing and personalizing your experience on our website.</li>
            <li>
              Providing you with relevant content and recommendations based on
              your preferences and interests.
            </li>
            <li>
              Sending you periodic updates, newsletters, and promotional
              material that may be of interest to you.
            </li>
            <li>
              Responding to your inquiries, support requests, and feedback
              effectively and efficiently.
            </li>
            <li>
              Analyzing usage patterns to improve our website&apos;s
              functionality and user interface.
            </li>
            <li>
              Ensuring compliance with legal obligations and protecting against
              potential fraud or misuse of our services.
            </li>
          </ol>
        </p>

        <h1 className="font-PT text-2xl font-semibold">
          Cookies and Tracking Technologies:
        </h1>
        <p>
          To provide a more engaging and customized user experience, we use
          cookies and other tracking technologies. Cookies are small text files
          placed on your device that help us remember your preferences and track
          your interactions with our website. You can control and manage cookies
          through your browser settings, but please be aware that disabling
          cookies may impact your ability to use certain features of our site
          effectively. Additionally, we may use tracking technologies such as
          web beacons and pixels to collect information about your browsing
          habits and analyze site performance.
        </p>

        <h1 className="font-PT text-2xl font-semibold">Data Security:</h1>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information. This includes the use of encryption
          technologies, secure servers, and access controls to protect against
          unauthorized access, alteration, or disclosure of your data. While we
          strive to use commercially acceptable means to safeguard your personal
          information, please be aware that no method of transmission over the
          Internet or electronic storage is 100% secure. We continuously review
          and enhance our security practices to ensure your data remains
          protected.
        </p>

        <h1 className="font-PT text-2xl font-semibold">
          Third-Party Services:
        </h1>
        <p>
          Our website may contain links to third-party websites and services
          that are not operated or controlled by Post-Room. We are not
          responsible for the privacy practices, content, or services provided
          by these third parties. We encourage you to review the privacy
          policies of any third-party sites you visit to understand how your
          information is handled. Our inclusion of links to external sites does
          not imply endorsement or responsibility for their content or
          practices.
        </p>

        <h1 className="font-PT text-2xl font-semibold">Your Rights:</h1>
        <p>
          Depending on your location and applicable privacy laws, you may have
          certain rights regarding your personal information. This may include
          the right to access, correct, or delete the data we hold about you. If
          you wish to exercise any of these rights or have questions about how
          we process your information, please contact us. We will make
          reasonable efforts to address your requests in accordance with
          applicable laws and regulations.
        </p>

        <h1 className="font-PT text-2xl font-semibold">
          Changes to This Privacy Policy:
        </h1>
        <p>
          We may periodically update this Privacy Policy to reflect changes in
          our practices or legal requirements. When we make significant changes,
          we will post the updated policy on our website and notify you as
          appropriate. We encourage you to review this policy regularly to stay
          informed about how we are protecting your information. Your continued
          use of our website following any changes indicates your acceptance of
          the updated policy.
        </p>

        <h1 className="font-PT text-2xl font-semibold">Contact Us:</h1>
        <p>
          If you have any questions, concerns, or feedback regarding this
          Privacy Policy or our data handling practices, please do not hesitate
          to contact us. You can reach us at{" "}
          <strong>ako.mawlood01@gmail.com</strong>. We are committed to
          addressing your inquiries and ensuring your experience with Post-Room
          is positive and secure.
        </p>
      </div>
    </>
  );
};

export default PrivacyPage;
