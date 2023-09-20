

import { AccountBalance } from "@/components/account-balance";
import { AccountForm } from "@/components/account-form";
import { MainNav } from "@/components/main-nav";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Banking",
  description: "",
};

export default function HomePage() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Bank Account Management
            </h2>
            <div className="flex items-center space-x-4">
              <AccountBalance />
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardContent className="pl-2">
            <AccountForm />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <>asd</>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
