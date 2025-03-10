export class ShiftModal {
    private modal: HTMLElement;

    constructor(modalId: string) {
        this.modal = document.getElementById(modalId)!;
    }

    show(shift: any) {
        this.modal.innerHTML = `
            <div class="modal-content">
                <h3>${shift.title}</h3>
                <p><strong>Time:</strong> ${shift.start_time} - ${shift.end_time}</p>
                <p><strong>Location:</strong> ${shift.location}</p>
                <p><strong>Department:</strong> ${shift.department}</p>
                <p><strong>Available Spots:</strong> ${shift.applied} / ${shift.total}</p>
                <button id="applyShift">Apply</button>
                <button id="cancelShift">Cancel</button>
                <button id="closeModal">Close</button>
            </div>
        `;
        this.modal.style.display = "block";

        document.getElementById("applyShift")!.onclick = () => this.applyShift(shift.id);
        document.getElementById("cancelShift")!.onclick = () => this.cancelShift(shift.id);
        document.getElementById("closeModal")!.onclick = () => this.hide();
    }

    hide() {
        this.modal.style.display = "none";
    }

    async applyShift(shiftId: number) {
        console.log("Applying for shift:", shiftId);
        this.hide();
    }

    async cancelShift(shiftId: number) {
        console.log("Canceling shift:", shiftId);
        this.hide();
    }
}
