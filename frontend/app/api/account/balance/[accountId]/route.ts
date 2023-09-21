import axios, { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const ACCOUNT_ENDPOINT = "accounts";

interface Params {
  accountId: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  const { accountId } = params;

  if (!accountId) {
    return NextResponse.json(
      { message: "accountId is not defined" },
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }

  if (!API_URL) {
    return NextResponse.json(
      { message: "API_URL is not defined" },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }

  try {
    const response: AxiosResponse<{ balance: string }> = await axios.get(
      `${API_URL}/${ACCOUNT_ENDPOINT}/${accountId}/balance`,
      {}
    );
    return NextResponse.json(response.data, {
      status: HttpStatusCode.Ok,
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
