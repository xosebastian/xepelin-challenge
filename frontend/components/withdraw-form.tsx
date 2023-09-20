"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "@/redux/store";
import { withdraw } from "@/redux/features/account-slice";
import axios, { isAxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const formSchema = z.object({
  balance: z
    .string()
    .max(4, {
      message: "The balance should have at most 4 digits.",
    })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "The balance should be a number with up to 2 decimal places.",
    })
    .transform((value) => parseFloat(value)),
});

export function WithdrawForm({ accountId }: { accountId: string }) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { balance } = values;

    try {
      await axios.post("/api/withdraw", {
        accountId,
        balance,
      });

      dispatch(
        withdraw({
          balance,
        })
      );

      toast({
        title: "Withdraw successful",
        description: "The withdraw was successful.",
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
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Withdraw to account
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 pl-6"  onChange={
          () => {
            setError(null);
          }
        }>
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Balance</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Withdraw</Button>
        </form>
      </Form>
      {error && (
        <Alert variant={"destructive"} className="mt-5">
          <AlertTitle>Ups!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
