import { ShiftCalendar } from "./calendar";
import { Filter } from "./filters";

// Expose modules globally
if (typeof window !== "undefined") {
    (window as any).ShiftCalendar = ShiftCalendar;
    (window as any).Filter = Filter;
}
