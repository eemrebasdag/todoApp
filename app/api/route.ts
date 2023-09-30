import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (e) {
    return Error("Database connection failed");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    console.log("Get");
    await main();
    const allTodos = await prisma.todolist.findMany();
    return NextResponse.json({ message: "Success", data: allTodos });
  } catch (e) {
    return NextResponse.json({ message: "Error", data: e });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    console.log("Create");
    const { name, status } = await req.json();
    await main();
    const newTodo = await prisma.todolist.create({ data: { name, status } });
    return NextResponse.json({ message: "Success", data: newTodo });
  } catch (e) {
    return NextResponse.json({ message: "Error", data: e });
  } finally {
    await prisma.$disconnect();
  }
};
