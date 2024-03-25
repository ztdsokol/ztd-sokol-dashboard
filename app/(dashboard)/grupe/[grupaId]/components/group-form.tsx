"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Group, Program, Location, Member } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/custom_ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiSelectMember from "@/components/custom_ui/MSelect";

const formSchema = z.object({
  name: z.string().min(1),
  locationId: z.string().min(1),
  programId: z.string().min(1),
  members: z.array(z.string()),
});

type GroupFormValues = z.infer<typeof formSchema>;

interface GroupFormProps {
  initialData: Group | null;
  programs: Program[];
  locations: Location[];
  members: [Member];
}

export const GroupForm: React.FC<GroupFormProps> = ({
  initialData,
  programs,
  locations,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  const title = initialData ? "Uredi grupu" : "Dodaj grupu";
  const description = initialData ? "Uredi otvorenu grupu" : "Dodaj novu grupu";
  const toastMessage = initialData ? "Group updated." : "Group created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      locationId: "",
      programId: "",
      members: [],
    },
  });

  const getMembers = async () => {
    try {
      const res = await axios.get("/api/clanovi");
      setMembers(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log("[GroupForm_GET_MEMBERS]", err);
      toast.error("Error fetching members");
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const onSubmit = async (data: GroupFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/grupe/${params.grupaId}`, data);
      } else {
        await axios.post(`/api/grupe`, data);
      }
      router.refresh();
      router.push(`${origin}/grupe`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/grupe/${params.grupaId}`);
      router.refresh();
      router.push("/grupe");
      toast.success("Grupa je obrisana.");
    } catch (error: any) {
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between ">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Ime grupe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Odaberite program"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokacija</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Odaberite lokaciju"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Članovi</FormLabel>
                  <FormControl>
                    <MultiSelectMember
                      placeholder="ccc"
                      members={members}
                      value={field.value}
                      onChange={(id: string) =>
                        field.onChange([...field.value, id])
                      }
                      onRemove={(id: string) =>
                        field.onChange([
                          ...field.value.filter((memberId) => memberId !== id),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator className="mt-4" />
    </div>
  );
};
