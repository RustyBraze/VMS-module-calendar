export class Filter {
    private container: HTMLElement;
    private shifts: any[] = [];
    private onFilterChange: (filters: Record<string, string>) => void;
    
    constructor(containerId: string, onFilterChange: (filters: Record<string, string>) => void) {
        this.container = document.getElementById(containerId)!;
        this.onFilterChange = onFilterChange;
    }

    updateShifts(shifts: any[]) {
        this.shifts = shifts;
        this.render();
    }

    private getUniqueValues(field: string): string[] {
        return [...new Set(this.shifts.map(shift => shift[field]))].sort();
    }


    render() {
        if (!this.container) {
            console.error("Filter: No container found with ID");
            return;
        }

        const locations = this.getUniqueValues("location");
        const departments = this.getUniqueValues("department");

        this.container.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <label for="locationFilter" class="form-label">Location</label>
                    <select id="locationFilter" class="form-select">
                        <option value="">All Locations</option>
                        ${locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="departmentFilter" class="form-label">Department</label>
                    <select id="departmentFilter" class="form-select">
                        <option value="">All Departments</option>
                        ${departments.map(dep => `<option value="${dep}">${dep}</option>`).join('')}
                    </select>
                </div>
                <div class="col-md-4 d-flex align-items-end">
                    <button id="applyFilters" class="btn btn-primary w-100">Apply</button>
                </div>
            </div>
        `;

        document.getElementById("applyFilters")!.onclick = () => {
            const filters = {
                location: (document.getElementById("locationFilter") as HTMLSelectElement).value,
                department: (document.getElementById("departmentFilter") as HTMLSelectElement).value
            };
            this.onFilterChange(filters);
        };
    }


    // render(containerId: string) {
    //     const container = document.getElementById(containerId)!;

    //     container.innerHTML = `
    //     <div class="row">
    //         <div class="col-md-4">
    //             <label for="locationFilter" class="form-label">Location</label>
    //             <select id="locationFilter" class="form-select">
    //                 <option value="">All Locations</option>
    //                 <option value="Stage A">Stage A</option>
    //                 <option value="Main Entrance">Main Entrance</option>
    //                 <option value="Control Room">Control Room</option>
    //             </select>
    //         </div>
    //         <div class="col-md-4">
    //             <label for="departmentFilter" class="form-label">Department</label>
    //             <select id="departmentFilter" class="form-select">
    //                 <option value="">All Departments</option>
    //                 <option value="Logistics">Logistics</option>
    //                 <option value="Security">Security</option>
    //                 <option value="IT">IT</option>
    //             </select>
    //         </div>
    //         <div class="col-md-4 d-flex align-items-end">
    //             <button id="applyFilters" class="btn btn-primary w-100">Apply</button>
    //         </div>
    //     </div>
    // `;
    

    //     document.getElementById("applyFilters")!.onclick = () => {
    //         this.filters.location = (document.getElementById("locationFilter") as HTMLSelectElement).value;
    //         this.filters.department = (document.getElementById("departmentFilter") as HTMLSelectElement).value;
    //         this.filters.date = (document.getElementById("dateFilter") as HTMLInputElement).value;
    //         this.onFilterChange(this.filters);
    //     };
    // }
}

// // Make Filter available globally
// if (typeof window !== "undefined") {
//     (window as any).Filter = Filter;
// }
