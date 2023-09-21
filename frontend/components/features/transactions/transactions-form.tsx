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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

export const formTransactionSchema = z.object({
  balance: z
    .string()
    .max(4, {
      message: "The balance should have at most 4 digits.",
    })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "The balance should be a number with up to 2 decimal places.",
    })
    .transform((value) => parseFloat(value)),
  type: z.string({
    required_error: "Please select an Type to display.",
  }),
});

interface Props {
  onSubmit: (values: z.infer<typeof formTransactionSchema>) => void;
  onChange?: () => void;
}

export function TransactionsForm({ onSubmit, onChange }: Props) {
  const form = useForm<z.infer<typeof formTransactionSchema>>({
    resolver: zodResolver(formTransactionSchema),
    defaultValues: {
      balance: 0,
      type: "DEPOSIT",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={onChange} className="space-y-2 pl-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operation Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  data-testid="type"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of operation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DEPOSIT">Deposit</SelectItem>
                    <SelectItem value="WITHDRAWAL">Withdraw</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Input data-testid="balance" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button role="button" type="submit">
            Execute
          </Button>
        </form>
      </Form>
    </>
  );
}
