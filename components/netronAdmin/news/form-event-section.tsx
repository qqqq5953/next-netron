import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UseFormReturn } from 'react-hook-form'
import { z } from "zod"

export const eventSchema = {
  eventType: z.string().min(1, {
    message: "活動類型不得空白",
  }),
  speaker: z.string().min(1, {
    message: "主講人不得空白",
  }),
  eventStartTime: z.string().refine(val => {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    return dateTimeRegex.test(val);
  }, {
    message: "日期格式不正確，應為 yyyy-mm-ddThh:mm",
  }),
  eventEndTime: z.string().refine(val => {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    return dateTimeRegex.test(val);
  }, {
    message: "日期格式不正確，應為 yyyy-mm-ddThh:mm",
  }),
  eventCost: z.string().min(1, {
    message: "活動費用不得空白",
  }),
  currency: z.enum(["TWD", "USD"], {
    errorMap: (error, ctx) => {
      const typedError = error as z.ZodIssueOptionalMessage & { options?: string[] };

      if (ctx.data === "") {
        return { message: "幣別不得空白" };
      } else {
        return {
          message: typedError.options ?
            `幣別不正確，應為${typedError.options.join(", ")}` :
            '幣別不正確'
        };
      }
    }
  }
  ),
  ticketDeadline: z.string().refine(val => {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    return dateTimeRegex.test(val);
  }, {
    message: "日期格式不正確，應為 yyyy-mm-ddThh:mm",
  }),
  eventWebsite: z.string().min(1, {
    message: "活動網站不得空白",
  }),
  companyName: z.string().min(1, {
    message: "公司名稱不得空白",
  }),
  companyWebsite: z.string().min(1, {
    message: "公司官網不得空白",
  }),
}

type Props = {
  form: UseFormReturn<any, any, undefined>
};

export default function FormEventSection(props: Props) {
  return (
    <div className='flex flex-col gap-4'>
      {/* 活動類型 */}
      <FormField
        control={props.form.control}
        name="eventType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">活動類型</FormLabel>
            <div className='grow'>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="focus-visible:outline-indigo-300">
                    <SelectValue placeholder="請選擇活動類型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">線上活動</SelectItem>
                    <SelectItem value="onsite">實體活動</SelectItem>
                    <SelectItem value="both">線上及實體活動</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* 主講人 */}
      <FormField
        control={props.form.control}
        name="speaker"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">主講人</FormLabel>
            <div className='grow'>
              <FormControl>
                <Input
                  className="focus-visible:outline-indigo-300"
                  placeholder="請輸入主講人"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* 活動開始時間 */}
      <FormField
        control={props.form.control}
        name="eventStartTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">活動開始時間</FormLabel>
            <div className='grow'>
              <FormControl>
                <Input
                  className="focus-visible:outline-indigo-300"
                  placeholder="2024-01-31T13:00"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* 活動結束時間 */}
      <FormField
        control={props.form.control}
        name="eventEndTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">活動結束時間</FormLabel>
            <div className='grow'>
              <FormControl>
                <Input
                  className="focus-visible:outline-indigo-300"
                  placeholder="2024-01-31T17:00"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* 活動費用 */}
      <FormField
        control={props.form.control}
        name="eventCost"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">活動費用</FormLabel>
            <FormControl>
              <Input
                className="focus-visible:outline-indigo-300"
                placeholder="請輸入金額"
                {...field} />
            </FormControl>
            <FormMessage className='mt-1.5' />
          </FormItem>
        )}
      />
      <FormField
        control={props.form.control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                className="focus-visible:outline-indigo-300"
                placeholder="請輸入幣別：TWD、USD、..."
                {...field} />
            </FormControl>
            <FormMessage className='mt-1.5' />
          </FormItem>
        )}
      />

      {/* 售票截止時間 */}
      <FormField
        control={props.form.control}
        name="ticketDeadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">售票截止時間</FormLabel>
            <div className='grow'>
              <FormControl>
                <Input
                  className="focus-visible:outline-indigo-300"
                  placeholder="2024-01-31T17:00"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* 活動網站 */}
      <FormField
        control={props.form.control}
        name="eventWebsite"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">活動網站</FormLabel>
            <div className='grow'>
              <FormControl>
                <Input
                  className="focus-visible:outline-indigo-300"
                  placeholder="請輸入活動網站"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* 活動舉辦商資訊 */}
      <div className='space-y-4'>
        <FormField
          control={props.form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-base text-neutral-800">活動舉辦商資訊</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:outline-indigo-300"
                  placeholder="公司名稱"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name="companyWebsite"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="focus-visible:outline-indigo-300"
                  placeholder="公司官網"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
