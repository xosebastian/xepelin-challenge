"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { z } from "zod";
import { TransactionsForm, formTransactionSchema } from "./transactions-form";
import { transactions } from "@/redux/features/account-slice";

export function Transactions() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const accountId = useAppSelector((state) => state.account.id);

  async function onSubmit(values: z.infer<typeof formTransactionSchema>) {
    const { balance, type } = values;

    try {
      await axios.post("/api/transactions", {
        accountId,
        balance,
        type,
      });

      dispatch(
        transactions({
          balance,
          type,
        })
      );
      toast({
        title: type,
        description: `${type} was successful`,
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
        <>
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Account Operations
            </h3>
          </div>
          <TransactionsForm
            onSubmit={onSubmit}
            onChange={() => setError(null)}
          />

          {error && (
            <Alert variant={"destructive"} className="mt-5">
              <AlertTitle>Ups!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </>
      ) : (
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Please create an account to continue
          </h3>
        </div>
      )}
    </>
  );
}
