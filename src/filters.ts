export class Filter {
    private filters: Record<string, string> = {};

    constructor(private onFilterChange: (filters: Record<string, string>) => void) {}

    render(containerId: string) {
        const container = document.getElementById(containerId)!;
        container.innerHTML = `
            <select id="locationFilter">
                <option value="">All Locations</option>
                <option value="Stage A">Stage A</option>
                <option value="Main Entrance">Main Entrance</option>
                <option value="Control Room">Control Room</option>
            </select>
            <select id="departmentFilter">
                <option value="">All Departments</option>
                <option value="Logistics">Logistics</option>
                <option value="Security">Security</option>
                <option value="IT">IT</option>
            </select>
            <input type="date" id="dateFilter">
            <button id="applyFilters">Apply</button>
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
