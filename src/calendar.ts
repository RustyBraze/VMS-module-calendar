import { generateShifts } from "./dummyData";
import { Filter } from "./filters";
import { ShiftModal } from "./modal";

export class ShiftCalendar {
    private container: HTMLElement;
    private shifts = generateShifts();
    private modal: ShiftModal;

    private hours = Array.from({ length: 24 }, (_, i) => i); // 24-hour format (00:00 - 23:00)

    constructor(containerId: string, modalId: string) {
        this.container = document.getElementById(containerId)!;
        this.modal = new ShiftModal(modalId);
    }

    render(filters: Record<string, string> = {}) {

        if (!this.container) {
            console.error("ShiftCalendar: No container found with ID");
            return;
        }

        console.log("Rendering calendar..."); // Check if the function runs

        const filteredShifts = this.shifts.filter(shift =>
            (!filters.location || shift.location === filters.location) &&
            (!filters.department || shift.department === filters.department) &&
            (!filters.date || shift.start_time.startsWith(filters.date))
        );

        console.log("Filtered Shifts:", filteredShifts); // Check if shifts are available

        if (filteredShifts.length === 0) {
            console.warn("No shifts to display.");
        }

        // // Generate timeline grid
        // this.container.innerHTML = `
        //     <div class="timeline">
        //         <div class="time-header">
        //             ${this.hours.map(hour => `<div class="time-slot">${hour}:00</div>`).join('')}
        //         </div>
        //         <div class="shifts-container">
        //             ${filteredShifts.map(shift => this.renderShiftBlock(shift)).join('')}
        //         </div>
        //     </div>
        // `;

        // Generate HTML for time slots
        const timeHeaderHtml = this.hours.map(hour => `<div class="time-slot">${hour}:00</div>`).join('');


        console.log("Render Timeline");

        // this.container.innerHTML = `<div class="timeline">${filteredShifts.map(shift => `
        //     <div class="shift ${shift.available ? 'available' : 'full'}" data-id="${shift.id}">
        //         <strong>${shift.title}</strong> (${shift.applied}/${shift.total})
        //         <br> ${shift.start_time} - ${shift.end_time}
        //         <br> ${shift.location}
        //     </div>`).join('')}
        // </div>`;

        // Generate HTML for shifts
        const shiftsHtml = filteredShifts.map(shift => {
            console.log(`Rendering shift: ${shift.title} at ${shift.start_time}`);
            return `
                <div class="shift ${shift.available ? 'available' : 'full'}" data-id="${shift.id}">
                    <strong>${shift.title}</strong> (${shift.applied}/${shift.total})
                    <br> ${shift.start_time} - ${shift.end_time}
                    <br> ${shift.location}
                </div>`;
        }).join('');


        this.container.querySelectorAll(".shift").forEach(element => {
            element.addEventListener("click", () => {
                const shiftId = parseInt(element.getAttribute("data-id")!);
                const shift = this.shifts.find(s => s.id === shiftId);
                if (shift) this.modal.show(shift);
            });
        });



        // Insert content into the container
        this.container.innerHTML = `
            <div class="timeline">
                <div class="time-header">${timeHeaderHtml}</div>
                <div class="shifts-container">${shiftsHtml}</div>
            </div>
        `;

        console.log("Calendar rendered successfully.");
    }

    private renderShiftBlock(shift: any): string {
        const startHour = new Date(shift.start_time).getHours();
        const endHour = new Date(shift.end_time).getHours();
        const duration = endHour - startHour;

        return `
            <div class="shift-block" style="grid-column: ${startHour + 1} / span ${duration}; background-color: ${shift.available ? 'green' : 'red'};">
                <strong>${shift.title}</strong><br>
                ${shift.applied}/${shift.total} applied
            </div>
        `;
    }
}


// // Ensure the class is available globally if using UMD
// if (typeof window !== "undefined") {
//     (window as any).ShiftCalendar = ShiftCalendar;
// }