"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { create, clear } from "@/redux/features/account-slice";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { useToast } from "../../ui/use-toast";
import { AccountForm, formAccountSchema } from "./account-form";

export function Account() {
  const dispatch = useAppDispatch();
  const accountId = useAppSelector((state) => state.account.id);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formAccountSchema>) {
    const { accountName, accountNumber, balance } = values;

    try {
      const {
        data: { accountId },
      }: AxiosResponse<{ accountId: string }> = await axios.post(
        "/api/account/create",
        {
          accountName,
          accountNumber,
          balance,
        }
      );

      dispatch(
        create({
          id: accountId,
        })
      );

      toast({
        title: "Account created",
        description: `Account ${accountName} created with id ${accountId}`,
      });
    } catch (error: any) {
      const message = isAxiosError(error)
        ? error?.response?.data.message
        : error?.message ?? "Something went wrong";

      setError(message);
    }
  }

  return (
    <>
      {accountId ? (
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            My Account
          </h3>
          <p className="text-sm text-muted-foreground">id: {accountId}</p>
          <Button
            onClick={() => {
              dispatch(clear());
            }}
          >
            Create Another
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Create Account
            </h3>
          </div>
          <AccountForm onSubmit={onSubmit} onChange={() => setError(null)} />
          {error && (
            <Alert variant={"destructive"} className="mt-5">
              <AlertTitle>Ups!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </>
      )}
    </>
  );
}
