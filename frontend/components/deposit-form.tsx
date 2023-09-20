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
import { deposit } from "@/redux/features/account-slice";
import axios from "axios";

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

export function DepositForm({ accountId }: { accountId: string }) {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { balance } = values;

    await axios.post("/api/deposit", {
      accountId,
      balance,
    });

    dispatch(
      deposit({
        balance,
      })
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Deposit to account
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 pl-6">
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
          <Button type="submit">Deposit</Button>
        </form>
      </Form>
    </>
  );
}
