import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const reportId = req.body.reportId;
      const label = req.body.label;
      const xPos = req.body.xPos;
      const yPos = req.body.yPos;
      const detail = req.body.injuryDescription;

      const injury = await prisma.injuryDetail.create({
        data: {
          reportId: reportId,
          label: label,
          x: xPos,
          y: yPos,
          injuryDescription: detail,
        },
      });

      if (injury) {
        res.status(200).json({ success: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
