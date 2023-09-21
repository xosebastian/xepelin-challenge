import axios, { HttpStatusCode, isAxiosError } from "axios";
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const ACCOUNT_ENDPOINT = "accounts";


export async function POST(request: Request) {
 
  const {accountName, accountNumber, balance } = await request.json();


  if (!API_URL) {
    return NextResponse.json(
      { message: "API_URL is not defined" },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }

  try {
    const response = await axios.post(`${API_URL}/${ACCOUNT_ENDPOINT}`, {
      name: accountName,
      accountNumber,
      balance,
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
