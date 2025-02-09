// Post Method
let addDoctor=()=>{

    let dr_name = document.querySelector("#newDoctorName").value.trim()
    let dr_age = document.querySelector("#newDoctorAge").value.trim()
    let dr_gender = document.querySelector("#newDoctorGender").value.trim()
    let dr_contact = document.querySelector("#newDoctorContact").value.trim()
    let dr_timing = document.querySelector("#newDoctorTiming").value.trim()
    let fees = document.querySelector("#price").value
    let dr_speciality = document.querySelector("#newDoctorSpeciality").value.trim() // DR. Profession


    if(!dr_name || !dr_age || !dr_contact || !dr_gender || !dr_timing || !dr_speciality){
         
        alert("Please, Fill out necessary fields")
        return false;
    }

    else if(dr_age>100){
        alert("Age must be less than 100")
        return false;
    }

    else if (dr_contact.length !== 10){
        alert("Invalid Mobile Number")
        return false;
    }

    else if (dr_gender.toLowerCase() !=="male" && dr_gender.toLowerCase() !=="female" && dr_gender.toLowerCase() !=="other" && dr_gender !=="others"){
        alert("Gender should be either : Male,Female or Other/Others")
        return false;
    }

    /* POST METHOD */

    let url = "http://localhost:3000/Doctors"

    fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
            {
                name:dr_name,
                age: dr_age,
                gender: dr_gender,
                contact: dr_contact,
                speciality: dr_speciality,
                fees:fees,
                timing: dr_timing
            }
        )
    })

    // location.href=""
    return false;

}

/* Show Recently Added Doctor  */
/* "GET METHOD */
let recentlyAddedDr = async () => {
    let recentDoctor = document.querySelector("#recentlyAddedDr");
    let url = `http://localhost:3000/Doctors`;
    let res = await fetch(url, { method: "GET" });
    let data = await res.json();

    recentDoctor.innerHTML = ""; // Clear previous content

    if (data.length === 0) {
        recentDoctor.innerHTML = `<p class="no-doctor">No doctors have been appointed lately.</p>`;
        return;
    }

    let lastDoctor = data[data.length - 1]; // Get the last doctor added

    recentDoctor.innerHTML = `
        
        <div class="doctor-card">
            <p class="recentlypara">Recently Appointed</p>
            <h3 class="doctor-name">${lastDoctor.name}</h3>
            <p><strong>Age:</strong> ${lastDoctor.age}</p>
            <p><strong>Gender:</strong> ${lastDoctor.gender}</p>
            <p><strong>Speciality:</strong> ${lastDoctor.speciality}</p>
            <p><strong>Timing:</strong> ${lastDoctor.timing}</p>
            <p><strong>Contact:</strong> ${lastDoctor.contact}</p>
            <p class="doctor-fees"><strong>Fees:</strong> ${lastDoctor.fees}₹</p>
            <p class="latestDrbuttons"> 
                <button class="edit-btn" onclick="editDoctor('${lastDoctor.id}')" >Edit</button>   
                <button class="remove-btn" onclick="removeDoctor('${lastDoctor.id}')" >Remove</button>
            </p>
        </div>
    `;
};
recentlyAddedDr();

/* Delete Recently Added Doctor */
let removeDoctor=(id)=>{
    let url = `http://localhost:3000/Doctors/${id}`;
    fetch(url,{method:"DELETE"})

}


/* Update Recently Added Doctors Method */
/* "GET METHOD FOR "PUT" */
let editDoctor = async (id) => {
    let url = `http://localhost:3000/Doctors/${id}`;

    let res = await fetch(url, { method: "GET" });
    let data = await res.json();

    let editDoctorCont = document.querySelector(".edit-doctor_cont");
    editDoctorCont.style.display = "flex";

    editDoctorCont.innerHTML = `
    <div class="drEditForm">
                <h2>Edit Doctor Details</h2>
                <p> Name :   </p>  <input value="${data.name}" id="newDrEditName" type="text" placeholder="Name">
                <p> Age :    </p>  <input value="${data.age}" id="newDrEditAge" type="text" placeholder="Age">
                <p> Gender : </p>  <input value="${data.gender}" id="newDrEditGender" type="text" placeholder="Gender">
                <p> Contact :</p>  <input value="${data.contact}" id="newDrEditContact" type="text" placeholder="Contact">

                <p> Speciality :   
                  <select name="" id="newDrEditSpeciality"> 
                      <option value="">Select Category</option>
                      <option value="Surgeon">Surgeon</option>
                      <option value="Dentist">Dental</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Orthologist">Orthologist</option>
                      <option value="Dermatologists">Dermatologists</option>
                      <option value="Physiatrists">Physiatrists</option>
                      <option value="Psychologist">Psychologist</option>
                  </select>
                </p>
                <p> Consultancy Fees : </p> <input value="${data.fees}" id="newDrEditFees" type="text" placeholder="Consultancy Fees">

                <p> Timing : </p> <input value="${data.timing}" id="newDrEditTiming" type="text" placeholder="Timing">
                
                <p class="editActions"> 
                <input id="addDrEditSubmit"  onclick="finalEdit('${data.id}')" type="submit" value="Submit"> 
                <button onclick="cancelEdit()">Cancel</button>
                </p>
    </div>
    `;

    // Close form when clicking outside
    document.addEventListener("click", function (event) {
        let form = document.querySelector(".drEditForm");
        if (editDoctorCont.style.display === "flex" && !form.contains(event.target)) {
            editDoctorCont.style.display = "none";
        }
    });

    location.href = "#editForum";
};

// Cancel function to hide form
let cancelEdit = () => {
    document.querySelector(".edit-doctor_cont").style.display = "none";
     location.href="#recentlyAddedDr"
};


/* Editing Doctor Details */
/* "PUT METHOD" */
let finalEdit=(id)=>{

    // Edit Input into variables
    let name = document.querySelector("#newDrEditName").value.trim()
    let age = document.querySelector("#newDrEditAge").value.trim()
    let gender = document.querySelector("#newDrEditGender").value.trim()
    let contact = document.querySelector("#newDrEditContact").value.trim()
    let speciality = document.querySelector("#newDrEditSpeciality").value.trim()
    let timing = document.querySelector("#newDrEditTiming").value.trim()
    let fees = document.querySelector("#newDrEditFees").value.trim()

    if(!name || !age || !contact || !gender || !speciality || !timing){
        alert("Empty or Invalid Fields has been hit")
        return false;
    }
    else if (age>100){
        alert("Age should be less than 100")
        return false;
    }
    else if (contact.length !==10){
        alert("invalid number format")
        return false;
    }
    else if (gender !=="male" && gender !=="MALE" && gender !=="female" && gender !=="FEMALE" && gender !=="other" && gender !=="OTHER"){
        alert("Invalid Gender")
        return false
    }

    // Put method 
      let url = `http://localhost:3000/Doctors/${id}`

         fetch(url,{method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                age:age,
                gender:gender,
                fees:fees,
                speciality:speciality,
                timing:timing,
                contact:contact,
            })
         })

         location.href="#showAddedDr"

}






/* Show Listed Doctor */
/* Fetch and Display Doctors */
let doctorsData = []; // Store fetched data

let fetchDoctors = async () => {
    try {
        let res = await fetch("http://localhost:3000/Doctors");
        doctorsData = await res.json(); // Store data globally

        updatePagination(doctorsData); // Apply pagination
    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
};

let displayDoctors = (dr) => {
    let tbody = document.querySelector(".tbody");
    tbody.innerHTML = ""; // Clear previous data

    if (dr.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8">No doctors found.</td></tr>`;
        return;
    }

    dr.forEach((e) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${e.name}</td>
            <td>${e.age}</td>
            <td>${e.gender}</td>
            <td>${e.speciality}</td>
            <td>${e.timing}</td>
            <td>₹ ${e.fees}</td>
            <td>${e.contact}</td>
            <td>
                <button id="editbutton" onclick="editDoctorList('${e.id}')">Edit</button>
                <button id="removebutton" onclick="deleteDoctor('${e.id}')">Remove</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};

/* Delete Doctor From list */
let deleteDoctor=(id)=>{
    let url = `http://localhost:3000/Doctors/${id}`

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            // Perform the DELETE request only if the user confirms
            fetch(url, { method: "DELETE" })
             }
            })
}


/* Pagination Function */
let updatePagination = (data) => {
    $("#pagination").pagination({
        dataSource: data,
        pageSize: 5,
        callback: displayDoctors, // Call display function with paginated data
    });
};

/* Search Function */
let searchDoctors = () => {
    let query = document.querySelector("#search").value.toLowerCase();
    let filteredData = doctorsData.filter((e) => 
        e.name.toLowerCase().includes(query) || 
        e.speciality.toLowerCase().includes(query) ||
        e.fees.toLowerCase().includes(query) ||
        e.gender.toLowerCase() === query // Gender must match exactly
    );
    updatePagination(filteredData); // Reapply pagination with filtered results
};

/* Load Data on Page Load */
window.onload = fetchDoctors;






// ====================================================================================================== //


// locating To -- > updatedDoctors.html 

let editDoctorList=(id)=>{
    location.href=`./updatedDoctors.html?id=${id}`
}

