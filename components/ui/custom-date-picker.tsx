import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './calendar';
import { cn } from '@/lib/utils';
import { SelectSingleEventHandler } from 'react-day-picker';

type customdatepickerProps = {
    date:Date | undefined;
    setDate:React.Dispatch<React.SetStateAction<Date>> | undefined;
    
};

const CustomDatePicker:React.FC<customdatepickerProps> = ({date,setDate}) => {
    const handleDateSelect: SelectSingleEventHandler = (selectedDate ) => {
        if (setDate && selectedDate instanceof Date) {
            setDate(selectedDate);
          }
      };
    return (
        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
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
           onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    )
}
export default CustomDatePicker;