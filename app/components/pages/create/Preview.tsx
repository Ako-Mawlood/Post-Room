import Image from "next/image";
import BlogContent from "@/app/components/shared/BlogContent";

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
  return (
    <section className="relative min-h-[80vh] px-6">
      <h1 className="w-full py-4 font-PT text-3xl text-accent-foreground">
        {title}
      </h1>

      <div className="relative h-[50vh] w-full overflow-hidden">
        <Image
          className="my-2 object-cover"
          src={
            imageUrl ||
            "https://cdn.dribbble.com/users/942818/screenshots/16384489/media/70e914e91b4ecc5765c5faee678ad5d0.jpg"
          }
          fill={true}
          sizes="(max-width: 639px) 400px, (min-width: 640px) and (max-width: 767px) 700px, (min-width: 768px) and (max-width: 1023px) 1064px, (min-width: 1024px) 768px"
          quality={100}
          alt="Blog image"
        />
      </div>
      {selectedCategories && (
        <ul className="mb-20 mt-4 flex flex-wrap gap-3">
          {selectedCategories.map((category, index) => (
            <li key={index} className="flex gap-1">
              <span className="font-PT text-violet-600">#</span>
              <span className="text-primary">{category}</span>
            </li>
          ))}
        </ul>
      )}
      <article className="prose w-full dark:prose-dark">
        <BlogContent content={content} />
      </article>
    </section>
  );
};

export default Preview;
