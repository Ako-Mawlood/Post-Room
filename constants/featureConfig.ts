import {
  Edit3,
  Globe,
  Users,
  Shield,
  Eye,
  MessageCircle,
  BookOpen,
} from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType;
};

export const featureConfig: Feature[] = [
  {
    title: "Effortless Blogging",
    description:
      "Leverage our advanced editor with ease so that you can write and publish your blogs without any issues. Our tools assist users in formatting headlines and writing captivating essays that appeal to the audience.",
    icon: Edit3, // Updated to use a different pen icon
  },

  {
    title: "Endless Reads",
    description:
      "Enjoy a diverse library of blogs. Find content that inspires, informs, and entertains you.",
    icon: BookOpen,
  },
  {
    title: "Active Community",
    description:
      "Establish relationships that are significant. Engage with your audience as well as other authors by commenting, liking and sharing so as to foster a community that appreciates deeper and supportive talks",
    icon: Users,
  },
  {
    title: "Secure Platform",
    description:
      "We ensure that your content and data are shielded round the clock through strong amendments, frequent upgrades, and other tweaks and therefore are always able to focus on their creativity at ease",
    icon: Shield,
  },
  {
    title: "Global Reach",
    description:
      "Bring your narratives to the audience around the world. Our platform makes your content available to a greater scope of readers and takes it across the borders so that it can speak to the world,",
    icon: Globe,
  },
];
