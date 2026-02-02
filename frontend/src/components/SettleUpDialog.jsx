import { useState } from "react";
import { X, Banknote } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";



export default function SettleUpDialog({
  groupId,
  members,
  defaultFrom,
  defaultTo,
  defaultAmount,
   addSettlement
}) {
  const [open, setOpen] = useState(false);

 

  const [from, setFrom] = useState(defaultFrom || "");
  const [to, setTo] = useState(defaultTo || "");
  const [amount, setAmount] = useState(defaultAmount || "");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !amount || from === to) return;

    await addSettlement({
      from,
      to,
      amount: Number(amount),
    });

    setOpen(false);
    setAmount("");
  }

  /* ===== BUTTON ===== */
  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        size="sm"
        className="gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
      >
        <Banknote className="h-4 w-4" />
        Settle
      </Button>
    );
  }

  /* ===== MODAL ===== */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Record Settlement</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* From */}
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full h-11 rounded-md border px-3 text-sm"
          >
            <option value="">From (who paid)</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.firstName || m.email}
              </option>
            ))}
          </select>

          {/* To */}
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full h-11 rounded-md border px-3 text-sm"
          >
            <option value="">To (who received)</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.firstName || m.email}
              </option>
            ))}
          </select>

          {/* Amount */}
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Save Settlement
          </Button>
        </form>
      </div>
    </div>
  );
}
