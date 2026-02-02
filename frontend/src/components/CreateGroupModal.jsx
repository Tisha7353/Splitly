import { useState } from "react";
import { useCreateGroup, useGroups } from "../hooks/useGroups";

export default function CreateGroupModal({ setGroups }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { createGroup } = useCreateGroup();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

 
const saved = await createGroup({
      name,
      description,
      currency: "USD",
    });
setGroups(prev => [saved, ...prev]);
   
    setOpen(false);
    setName("");
    setDescription("");
  };

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-white px-6 py-3 rounded-full"
      >
        Create Group
      </button>
    );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Create Group</h2>

        <input
          placeholder="Group Name"
          required
          className="w-full border p-3 rounded"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
