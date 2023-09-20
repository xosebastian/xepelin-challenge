"use client";
import { useAppSelector } from "@/redux/store"

export function AccountBalance () {

  const balance = useAppSelector((state) => state.account.balance);

  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        $ {balance}
      </h3>
    </div>
  )
}