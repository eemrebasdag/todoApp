import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (e) {
    return Error("Database connection failed");
  }
}

type Request = {
  body: {
    id: number;
  };
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    console.log("Delete");
    const idURL = req.url.split("/api/")[1];
    console.log(idURL);
    const id = parseInt(idURL);
    console.log(id);
    await main();
    await prisma.todolist.delete({ where: { id } });
    const todos = await prisma.todolist.findMany();
    return NextResponse.json({ message: "Successfully Deleted", data: todos });
  } catch (e) {
    return NextResponse.json({ message: "Error", data: e });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    console.log("Update");
    const idURL = req.url.split("/api/")[1];
    const id = parseInt(idURL);
    console.log(id);
    await main();
    await prisma.todolist.update({
      where: { id },
      data: { status: "Completed" },
    });
    const todos = await prisma.todolist.findFirst({ where: { id } });
    return NextResponse.json({ message: "Successfully Updated", data: todos });
  } catch (e) {
    return NextResponse.json({ message: "Error", data: e });
  } finally {
    await prisma.$disconnect();
  }
};
