import { useState } from "react";
import {
  useForm,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { X, PlusCircle } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";



export default function CreateExpenseDialog({ groupId, members, addExpense }) {
  const [open, setOpen] = useState(false);

  /* ✅ PASS groupId HERE (THIS FIXES YOUR BUG) */
 

  const form = useForm({
    defaultValues: {
      description: "",
      amount: "",
      payerId: members?.[0]?._id || "",
      splitType: "equal",
      participants: members.map((m) => ({
        userId: m._id,
        included: true,
        amount: "",
        percentage: "",
      })),
    },
  });

  const { control, handleSubmit, register, reset } = form;

  const { fields } = useFieldArray({
    control,
    name: "participants",
  });

  /* ✅ SAFE WATCHES */
  const splitType = useWatch({ control, name: "splitType" });
  const totalAmount =
    Number(useWatch({ control, name: "amount" })) || 0;
  const participants =
    useWatch({ control, name: "participants" }) || [];

  const includedParticipants = participants.filter(
    (p) => p.included
  );
  const includedCount = includedParticipants.length || 1;

  /* ================= SUBMIT ================= */
  async function onSubmit(values) {
  if (!values.description || !values.amount) return;

  let splits = [];

  if (values.splitType === "equal") {
    const perPerson = totalAmount / includedCount;

    splits = includedParticipants.map((p) => ({
      userId: p.userId,
      amount: perPerson,
      percentage: 100 / includedCount,
    }));
  }

  if (values.splitType === "exact") {
    splits = includedParticipants.map((p) => {
      const amt = Number(p.amount) || 0;

      return {
        userId: p.userId,
        amount: amt,
        percentage: (amt / totalAmount) * 100,
      };
    });
  }

  if (values.splitType === "percentage") {
    splits = includedParticipants.map((p) => {
      const pct = Number(p.percentage) || 0;

      return {
        userId: p.userId,
        percentage: pct,
        amount: (totalAmount * pct) / 100,
      };
    });
  }

  await addExpense({
    description: values.description,
    amount: totalAmount,
    payerId: values.payerId,
    splits,
  });

  reset();
  setOpen(false);
}


  /* ================= BUTTON ================= */
  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
      >
        <PlusCircle className="h-4 w-4" />
        Add Expense
      </Button>
    );
  }

  /* ================= MODAL ================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Add Expense</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Description */}
          <Input
            placeholder="Description"
            {...register("description", { required: true })}
          />

          {/* Amount */}
          <Input
            type="number"
            placeholder="Amount"
            {...register("amount", { required: true })}
          />

          {/* Paid By */}
          <select
            {...register("payerId")}
            className="w-full h-11 rounded-md border px-3 text-sm"
          >
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.firstName || m.email}
              </option>
            ))}
          </select>

          {/* Split Type */}
          <select
            {...register("splitType")}
            className="w-full h-11 rounded-md border px-3 text-sm"
          >
            <option value="equal">Split Equally</option>
            <option value="exact">Exact Amount</option>
            <option value="percentage">Percentage</option>
          </select>

          {/* Participants */}
          <div className="space-y-2 border rounded-lg p-3">
            {fields.map((field, index) => {
              const member = members.find(
                (m) => m._id === field.userId
              );

              return (
                <div
                  key={field.id}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    {...register(
                      `participants.${index}.included`
                    )}
                  />

                  <span className="flex-1 text-sm">
                    {member?.firstName || member?.email}
                  </span>

                  {splitType === "equal" && (
                    <span className="text-sm text-gray-500">
                      ₹
                      {participants[index]?.included
                        ? (totalAmount / includedCount).toFixed(2)
                        : "0.00"}
                    </span>
                  )}

                  {splitType === "exact" && (
                    <Input
                      type="number"
                      className="w-24 h-8"
                      {...register(
                        `participants.${index}.amount`
                      )}
                      disabled={!participants[index]?.included}
                    />
                  )}

                  {splitType === "percentage" && (
                    <Input
                      type="number"
                      className="w-20 h-8"
                      {...register(
                        `participants.${index}.percentage`
                      )}
                      disabled={!participants[index]?.included}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Add Expense
          </Button>
        </form>
      </div>
    </div>
  );
}
