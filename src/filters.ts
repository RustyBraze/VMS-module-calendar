export class Filter {
    private filters: Record<string, string> = {};

    constructor(private onFilterChange: (filters: Record<string, string>) => void) {}

    render(containerId: string) {
        const container = document.getElementById(containerId)!;

        container.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <label for="locationFilter" class="form-label">Location</label>
                <select id="locationFilter" class="form-select">
                    <option value="">All Locations</option>
                    <option value="Stage A">Stage A</option>
                    <option value="Main Entrance">Main Entrance</option>
                    <option value="Control Room">Control Room</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="departmentFilter" class="form-label">Department</label>
                <select id="departmentFilter" class="form-select">
                    <option value="">All Departments</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Security">Security</option>
                    <option value="IT">IT</option>
                </select>
            </div>
            <div class="col-md-4 d-flex align-items-end">
                <button id="applyFilters" class="btn btn-primary w-100">Apply</button>
            </div>
        </div>
    `;
    

        document.getElementById("applyFilters")!.onclick = () => {
            this.filters.location = (document.getElementById("locationFilter") as HTMLSelectElement).value;
            this.filters.department = (document.getElementById("departmentFilter") as HTMLSelectElement).value;
            this.filters.date = (document.getElementById("dateFilter") as HTMLInputElement).value;
            this.onFilterChange(this.filters);
        };
    }
}

// // Make Filter available globally
// if (typeof window !== "undefined") {
//     (window as any).Filter = Filter;
// }
