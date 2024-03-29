import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const Data = await request.json();
    const { title, content } = Data;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!title || !content) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
