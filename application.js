// Function to Fetch Appointments and Populate Table
let showAllappointments = async () => {
    try {
        let url = `http://localhost:3000/Patient`;
        let res = await fetch(url);
        let data = await res.json();

        let appointsBody = document.querySelector(".appoint_body");
        appointsBody.innerHTML = ""; // Clear previous data

        data.forEach((e) => {
            appointsBody.innerHTML += `
            <tr>
                <td>${e.name}</td>
                <td>${e.age}</td>
                <td>${e.gender}</td>
                <td>${e.contact}</td>
                <td>${e.address}</td>
                <td>${e.pincode}</td>
                <td>
                    <button onclick="reject('${e.id}')"> Reject </button>
                </td>
            </tr>`;
        });

        // Initialize DataTable after data is inserted
        initializeDataTable();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Function to Initialize DataTable
function initializeDataTable() {
    $(".appoint_table").DataTable({
        pageLength: 10, // Show 5 entries per page
        lengthChange: false, // Disable "Show X Entries" dropdown
        searching: true, // Enable search functionality
        ordering: true, // Enable column sorting
    });
}

// Call function when page loads
window.onload = showAllappointments;

// Reject Function (Dummy Implementation)
function reject(id) {
    fetch(`http://localhost:3000/Patient/${id}`,{method:"DELETE"})
    alert("Form has been Rejected Successfully")
}
