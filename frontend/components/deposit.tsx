"use client";
import { useAppSelector } from "@/redux/store";
import { DepositForm } from "./deposit-form";
export function Deposit () {


  const accountId = useAppSelector((state) => state.account.id);

  if(!accountId) {
    return (
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Desposit to account
        </h3>
      </div>
    );
  }


  return <DepositForm accountId={accountId} />;  
}