"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { update } from "@/redux/features/account-slice";

export function AccountBalance() {
  const accountId = useAppSelector((state) => state.account.id);
  const balance = useAppSelector((state) => state.account.balance);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accountId) return;

    const getBalance = async () => {
      try {
        const {
          data: { balance },
        }: AxiosResponse<{ balance: string }> = await axios.get(
          `/api/account/balance/${accountId}`,
          {}
        );

        console.log(balance);

        dispatch(
          update({
            balance: parseFloat(balance),
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    getBalance();
  }, [accountId, dispatch]);

  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className="text-2xl font-semibold leading-none tracking-tight" data-testid="balance">
        $ {balance}
      </h3>
    </div>
  );
}
