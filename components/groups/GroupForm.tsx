"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
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
import { Textarea } from "../ui/textarea";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MultiSelectMember from "../custom_ui/MSelect";
import { Member } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(2).max(20),

  members: z.array(z.string()),
});

interface GroupFormProps {
  initialData?: GroupType | null; //Must have "?" to make it optional
}

const GroupForm: React.FC<GroupFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);

  const getMemberDetails = async () => {
    try {
      const res = await fetch("/api/members", {
        method: "GET",
      });
      const data = await res.json();
      setMembers(data);
      setLoading(false);
    } catch (err) {
      console.log("[members_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getMemberDetails();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          members: initialData.members.map((member) => member.id),
        }
      : {
          title: "",

          members: [],
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData ? `/api/groups/${initialData.id}` : "/api/groups";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Group ${initialData ? "updated" : "created"}`);
        window.location.href = "/groups";
        router.push("/groups");
      }
    } catch (err) {
      console.log("[groups_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return loading ? (
    <div className=""></div>
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Group</p>
        </div>
      ) : (
        <p className="text-heading2-bold">Create Group</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          {members.length > 0 && (
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>members</FormLabel>
                  <FormControl>
                    <MultiSelectMember
                      placeholder="members"
                      members={members}
                      value={field.value}
                      onChange={(id) => field.onChange([...field.value, id])}
                      onRemove={(idToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (memberId) => memberId !== idToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          )}

          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/groups")}
              className="bg-blue-1 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GroupForm;
