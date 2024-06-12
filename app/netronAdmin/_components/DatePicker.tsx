'use client'

import { useState } from 'react'
import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type Props = {
  form: UseFormReturn<any, any, undefined>
};

function DatePicker(props: Props) {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)

  function handleSelect(dateObj: Date | undefined, field: ControllerRenderProps<any, "articleDate">) {
    field.onChange(dateObj);
    setDate(dateObj);
    setOpen(false)
  }

  return (
    <Controller
      name="articleDate"
      control={props.form.control}
      render={({ field }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(dateObj) => handleSelect(dateObj, field)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}

function DatePickerField(props: Props) {
  return <FormField
    control={props.form.control}
    name="articleDate"
    render={() => (
      <FormItem className='flex flex-col'>
        <FormLabel className="font-normal text-base text-neutral-800">文章日期</FormLabel>
        <DatePicker form={props.form} />
        <FormMessage className='mt-1.5' />
      </FormItem>
    )}
  />
}

export default DatePicker
export { DatePickerField }