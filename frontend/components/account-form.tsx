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

import {  useAppDispatch, useAppSelector } from "@/redux/store";
import { create, clear } from "@/redux/features/account-slice";
import axios, { AxiosResponse } from "axios";

const formSchema = z.object({
  accountName: z.string().min(2, {
    message: "The name should have at least 2 characters.",
  }),
  accountNumber: z
    .string()
    .min(5, {
      message: "The account number should have at least 5 digits.",
    })
    .regex(/^\d+$/, {
      message: "The account number should only contain numbers.",
    }),
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

export function AccountForm() {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      balance: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { accountName, accountNumber, balance } = values;

    const {
      data: { accountId },
    }: AxiosResponse<{ accountId: string }> = await axios.post(
      "/api/create-account",
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
  }

  if (account.id)
    return (
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          My Account
        </h3>
        <p className="text-sm text-muted-foreground">id: {account.id}</p>
        <Button
          onClick={() => {
            dispatch(clear());
          }}
        >
          Create Another
        </Button>
      </div>
    );

  return (
    <>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Create Account
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-5">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your account name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number</FormLabel>
                <FormControl>
                  <Input
                    maxLength={5}
                    placeholder="Enter your account number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </>
  );
}
