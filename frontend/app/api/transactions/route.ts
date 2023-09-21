import axios, { HttpStatusCode, isAxiosError } from "axios";
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const TRANSACTIONS_ENDPOINT = "transactions";

export async function POST(request: Request) {
  const { accountId, balance, type } = await request.json();

  if (!API_URL) {
    return NextResponse.json(
      { message: "API_URL is not defined" },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }

  try {
    const response = await axios.post(`${API_URL}/${TRANSACTIONS_ENDPOINT}`, {
      accountId,
      amount: balance,
      type,
    });

    return NextResponse.json(response.data, {
      status: HttpStatusCode.Created,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status ?? HttpStatusCode.InternalServerError,
      });
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
