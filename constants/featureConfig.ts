import { Edit3, Globe, Users, Shield, Eye, MessageCircle } from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType;
};

export const featureConfig: Feature[] = [
  {
    title: "Effortless Blogging",
    description:
      "Write and publish your blogs with ease using our intuitive editor. From bold headlines to elegant formatting, our tools are designed to help you craft engaging stories that captivate your audience.",
    icon: Edit3, // Updated to use a different pen icon
  },
  {
    title: "Global Reach",
    description:
      "Take your stories to readers around the globe. Our platform ensures your content is accessible to a diverse audience, breaking geographical boundaries to give your words a global stage.",
    icon: Globe,
  },
  {
    title: "Engaged Community",
    description:
      "Build connections that matter. Interact with readers and fellow writers through comments, likes, and shares, creating a thriving community that values meaningful conversations and mutual support.",
    icon: Users,
  },
  {
    title: "Secure Platform",
    description:
      "We prioritize your security. From advanced encryption to regular updates, your content and data are protected at all times, giving you peace of mind to focus on creating.",
    icon: Shield,
  },
  {
    title: "Reader Insights",
    description:
      "Understand your readers like never before. Access detailed analytics about your blogs' performance, including views, engagement, and demographics, so you can tailor your content to what your audience loves.",
    icon: Eye,
  },
  {
    title: "Interactive Discussions",
    description:
      "Turn your blogs into vibrant conversations. Our built-in commenting system encourages readers to share their thoughts, fostering deeper engagement and meaningful discussions around your content.",
    icon: MessageCircle,
  },
];
