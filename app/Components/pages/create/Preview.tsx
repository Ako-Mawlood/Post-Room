import Image from "next/image";
import parse from "html-react-parser";
import { backgroundColors } from "@/constants/backgroundColors";
import { marked } from "marked";
type previewPropsType = {
  content: string;
  title: string;
  imageUrl: string | "none";
  selectedCategories: string[];
};
const Preview = ({
  content,
  title,
  imageUrl,
  selectedCategories,
}: previewPropsType) => {
  const htmlContent = marked(content) as string;
  return (
    <section className="relative min-h-[80vh] rounded-lg bg-gray-100 p-6 dark:bg-muted">
      <h1 className="w-full border-b-2 py-4 font-PT text-3xl text-accent-foreground">
        {title}
      </h1>

      <div className="relative h-[50vh] w-full overflow-hidden">
        <Image
          className="my-2 rounded-lg object-cover"
          src={
            imageUrl ||
            "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
          }
          fill={true}
          quality={100}
          alt="Blog image"
        />
      </div>
      {selectedCategories && (
        <ul className="mt-2 flex gap-3">
          {selectedCategories.map((category, index) => (
            <div key={index} className="flex gap-1">
              <span
                style={{
                  color: `rgb(${backgroundColors[index]},0.9)`,
                }}
              >
                #
              </span>
              <span className="text-primary">{category}</span>
            </div>
          ))}
        </ul>
      )}
      <div className="prose my-10 w-full">{parse(htmlContent)}</div>
    </section>
  );
};

export default Preview;
