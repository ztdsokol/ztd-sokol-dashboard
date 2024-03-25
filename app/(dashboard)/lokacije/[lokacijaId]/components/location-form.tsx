"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Location } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

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

const formSchema = z.object({
  name: z.string().min(2),
});

type LocationFormValues = z.infer<typeof formSchema>;

interface LocationFormProps {
  initialData: Location | null;
}

export const LocationForm: React.FC<LocationFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Uredi lokaciju" : "Dodaj lokaciju";
  const description = initialData
    ? "Uredi otvorenu lokaciju"
    : "Dodaj novu lokaciju";
  const toastMessage = initialData ? "Location updated." : "Location created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "" },
  });

  const onSubmit = async (data: LocationFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/lokacije/${params.lokacijaId}`, data);
      } else {
        await axios.post(`/api/lokacije`, data);
      }
      router.refresh();
      router.push(`${origin}/lokacije`);
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
      await axios.delete(`/api/lokacije/${params.lokacijaId}`);
      router.refresh();
      router.push("/lokacije");
      toast.success("lokacija je obrisana.");
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
                      placeholder="Ime lokacije"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
