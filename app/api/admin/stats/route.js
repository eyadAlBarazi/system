import connectDB from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const users = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: last30Days },
      },
    },

    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },

        count: { $sum: 1 },
      },    
    },

    { $sort: { _id: 1 } },
  ]);

  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  return NextResponse.json({
    usersPerDay: users,
    totalUsers,
    totalProducts,
    order: 0,
    visits: 0,
  });
}
