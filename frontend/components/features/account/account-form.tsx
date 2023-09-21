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

export const formAccountSchema = z.object({
  accountName: z.string().min(2, {
    message: "The name should have at least 2 characters.",
  }),
  accountNumber: z
    .string()
    .min(10, {
      message: "The account number should have at least 10 digits.",
    })
    .regex(/^\d+$/, {
      message: "The account number should only contain numbers.",
    }),
  balance: z
    .string()
    .max(5, {
      message: "The balance should have at most 5 digits.",
    })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "The balance should be a number with up to 2 decimal places.",
    })
    .transform((value) => parseFloat(value)),
});

interface Props {
  onSubmit: (values: z.infer<typeof formAccountSchema>) => void;
  onChange?: () => void;
}

export function AccountForm({ onSubmit, onChange }: Props) {
  const form = useForm<z.infer<typeof formAccountSchema>>({
    resolver: zodResolver(formAccountSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      balance: 0,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 p-5"
        onChange={onChange}
      >
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
                  maxLength={10}
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
        <Button role="button" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
}
