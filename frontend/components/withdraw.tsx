"use client";
import { useAppSelector } from "@/redux/store";
import { WithdrawForm } from "./withdraw-form";
export function Withdraw() {
  const accountId = useAppSelector((state) => state.account.id);

  if(!accountId) {
    return (
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Withdraw to account
        </h3>
      </div>
    );
  }

  return <WithdrawForm accountId={accountId} />;
}

