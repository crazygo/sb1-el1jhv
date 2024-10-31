import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Rocket } from "lucide-react";

const formSchema = z.object({
  version: z.string().min(5, {
    message: "版本号格式不正确",
  }),
  forceUpgrade: z.boolean().default(false),
});

export default function UpgradeConfigModule() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      version: "",
      forceUpgrade: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "配置已更新",
      description: `版本 ${values.version} ${values.forceUpgrade ? '需要' : '不需要'}强制升级`,
    });
    console.log(values);
  }

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">配置强制升级</h2>
          <p className="text-sm text-muted-foreground">
            设置新版本的升级策略
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>目标版本号</FormLabel>
                  <FormControl>
                    <Input placeholder="2.18.2" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="forceUpgrade"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">强制升级</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      开启后用户必须升级到新版本
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <Rocket className="mr-2 h-4 w-4" />
              确认更新
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}