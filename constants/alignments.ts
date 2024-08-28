import { AlignCenter, AlignLeft, AlignRight, LucideIcon } from "lucide-react";

type alignmentsType = {
  id: number;
  alignTo: "right" | "center" | "left";
  icon: LucideIcon;
}[];

export const alignments: alignmentsType = [
  { id: 1, alignTo: "left", icon: AlignLeft },
  { id: 2, alignTo: "center", icon: AlignCenter },
  { id: 3, alignTo: "right", icon: AlignRight },
];
