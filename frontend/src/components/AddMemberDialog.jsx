import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, UserPlus } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { useAddMember } from "../hooks/useGroups";

export default function AddMemberModal({ groupId,  addMemberLocal }) {
  const [open, setOpen] = useState(false);
  const { addMember } = useAddMember();

  const form = useForm({
    defaultValues: { email: "" },
  });

  async function onSubmit(values) {
    
    
   
     if (!values.email) return;

  const saved = await addMember({
    groupId,
    email: values.email,
  });

  
  addMemberLocal(saved.member);

  form.reset();
  setOpen(false);
  }

  /* ---------- Trigger ---------- */
  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="
          gap-2
          px-4
          py-2
          rounded-full
          border border-white/50
          bg-white/5
          text-white
          text-xs
          font-medium
          hover:bg-white/10
          transition
        "
      >
        <UserPlus className="h-4 w-4" />
        Add Member
      </Button>
    );
  }

  /* ---------- Modal ---------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Add Group Member
        </h2>

        {/* Info box */}
        <div className="mb-5 rounded-lg bg-gray-100 p-3 text-sm text-gray-600">
          The person you want to add must have an account first. Ask them to
          visit this app and log in, then you can add them using their email.
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 px-2">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="friend@example.com"
                      {...field}
                      className="h-11 text-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-11 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={form.formState.isSubmitting}
            >
              Add Member
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
