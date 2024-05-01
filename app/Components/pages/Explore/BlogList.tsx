
import Image from "next/image"
async function getBlogs() {
    const res = await fetch("http://localhost:2000/blog")
    return await res.json()
}
async function BlogList() {
    const blogs = await getBlogs()

    return (
        <section className="w-full flex justify-center mt-4 gap-10 cursor-pointer flex-wrap">
            {blogs && (blogs.map((blog: any) => (
                <div
                    className="w-96 h-[27rem] shadow-lg hover:shadow-slate-400 hover:shadow-lg duration-150 rounded-3xl hover:scale-[1.003]"
                    key={blog.id}>
                    <Image
                        className="w-full h-3/5 object-cover rounded-3xl"
                        width={700}
                        height={700}
                        alt="Blog image"
                        src="https://www.digitalocean.com/cdn-cgi/image/quality=75,width=828/https://www.digitalocean.com/api/static-content/v1/images?src=https%3A%2F%2Fdoimages.nyc3.cdn.digitaloceanspaces.com%2F002Blog%2F0-BLOG-BANNERS%2F37.png&raw=1"
                    />
                    <div className="flex h-2/5 flex-col justify-between items-start ml-4 py-4">
                        <h2 className="text-gray-700 text-2xl font-bold line-clamp-4">{blog.title}</h2>
                        <div className="flex flex-col">
                            <span className="font-semibold text-lg text-blue-600">{blog.author}</span>
                            <time className="font-semibold" dateTime="2024-04-30T08:00">April 30, 2024</time>
                        </div>
                    </div>
                </div>
            )))
            }
        </section>
    );
}

export default BlogList