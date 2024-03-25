"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { Member } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/custom_ui/imageUpload";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LayoutDashboardIcon } from "lucide-react";
import Delete from "../custom_ui/Delete";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  image: z.string().optional(),
});

interface MemberFormProps {
  initialData?: Member | null;
}
const MemberForm: React.FC<MemberFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          image: initialData.image || undefined,
        }
      : {
          name: "",
          email: "",
          image: undefined,
        },
  });
  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      // Handle whatever action you want to perform
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      const url = initialData
        ? `/api/members/${params.memberId}`
        : "/api/members/test";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success(`Member ${initialData ? "updated" : "created"}`);
        window.location.href = "/members";
        router.push("/members");
      }
    } catch (err) {
      console.log("[MemberForm_POST]", err);
      toast.error("Error creating member");
    }
  };

  return (
    <div>
      <h1>Member Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ime i prezime</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="shadcn"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slika člana</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="submit">Potvrdi</Button>
            <Button
              type="button"
              className=" text-white"
              onClick={() => router.push("/members")}
            >
              Poništi
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MemberForm;
