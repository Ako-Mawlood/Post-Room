import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { blogId: string } }) {
  try {
    const currentUser = await getCurrentUser();
    const Data = await request.json();
    const { title, content } = Data;

    // if (!currentUser) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!title || !content) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const BlogIdNumber = parseInt(params.blogId);

    const doesBlogExist = await prisma.blog.findUnique({
      where: {
        id: BlogIdNumber,
      },
    });

    if (!doesBlogExist) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    const blog = await prisma.blog.update({
      where: {
        id: BlogIdNumber,
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(blog);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
