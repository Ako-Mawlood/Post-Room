import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/libs/auth";

export async function GET(request: Request) {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        user: {
          select: {
            email: true,
            username: true,
            fullname: true,
            id: true
          }
        }
      }
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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
        userId: currentUser.id,
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
