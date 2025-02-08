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
                Consultancy:fees,
                timing: dr_timing
            }
        )
    })

    // location.href=""
    return false;

}

/* ONload Get MEthod */
let getNewDoctor = async () => {
   
    let drsAdded = document.querySelector(".drsAdded");

    let url = `http://localhost:3000/Doctors`;
    
    let res = await fetch(url, { method: "GET" });
    let data = await res.json();

    // **Do NOT overwrite the entire div** (Just clear table body)
    drsAdded.innerHTML = ""; 

    if (data.length === 0) {
        drsAdded.style.display = "flex";
        drsAdded.innerHTML = `<tr><td colspan="7">No doctors have been added recently.</td></tr>`;
    } else {
        drsAdded.style.display = "flex";
        let last = data[data.length - 1]; // Get the last added doctor

        // Append row to table body
        drsAdded.innerHTML += `
         <div class="doctor-card">
            <div class="doctor-header">
                <h3>${last.name} <span>(${last.speciality})</span></h3>
            </div>
            <div class="doctor-details">
                <p><strong>Age:</strong> ${last.age}</p>
                <p><strong>Gender:</strong> ${last.gender}</p>
                <p><strong>Fees:</strong> ₹&nbsp;${last.Consultancy} </p>
                <p><strong>Timing:</strong> ${last.timing}</p>
                <p><strong>Contact:</strong> ${last.contact}</p>
            </div>
            <div class="doctor-actions">
                <button class="btn-edit" onclick="edit('${last.id}')">Edit</button>
                <button class="btn-del" onclick="del('${last.id}')">Remove</button>
            </div>
        </div>
        `;
    }
};


// PUT Method

let edit=async(id)=>{
    let url = `http://localhost:3000/Doctors/${id}`

    let res = await fetch(url);
    let data = await res.json();

    let editDoctor = document.querySelector(".edit-doctor_cont")
    editDoctor.style.display="flex";
    
    // let last = data[data.length-1]


    editDoctor.innerHTML="" // Remove earlier data



    editDoctor.innerHTML+=
    `
    <div class="drEditForm">
                <h2>Edit Doctor Details</h2>
                <p> Name :   </p>  <input value="${data.name}" id="newDrEditName" type="text" placeholder="Name">
                <p> Age :    </p>  <input value="${data.age}" id="newDrEditAge" type="text" placeholder="Age">
                <p> Gender : </p>  <input value="${data.gender}" id="newDrEditGender" type="text" placeholder="Gender">
                <p> Contact :</p>  <input value="${data.contact}" id="newDrEditContact" type="text" placeholder="Contact">

                <p> Speciality :   
                  <select name="" id="newDrEditSpeciality">
                      <option value="None">Select Category</option>
                      <option value="Surgeon">Surgeon</option>
                      <option value="Dentist">Dental</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Orthologist">Orthologist</option>
                      <option value="Dermatologists">Dermatologists</option>
                      <option value="Physiatrists">Physiatrists</option>
                      <option value="Psychologist">Psychologist</option>
                  </select>
                </p>
                <p> Timing : </p> <input value="${data.timing}" id="newDrEditTiming" type="text" placeholder="Timing">
                <!-- PUT BUTTON -->
                <p> <input id="addDrEditSubmit"  onclick="finalEdit('${data.id}')" type="submit" value="Add Doctor"> </p>

            </div>

    `
      location.href="#editForum"
}

let finalEdit=(id)=>{

    // Edit Input into variables
    let name = document.querySelector("#newDrEditName").value.trim()
    let age = document.querySelector("#newDrEditAge").value.trim()
    let gender = document.querySelector("#newDrEditGender").value.trim()
    let contact = document.querySelector("#newDrEditContact").value.trim()
    let speciality = document.querySelector("#newDrEditSpeciality").value.trim()
    let timing = document.querySelector("#newDrEditTiming").value.trim()

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
               
                speciality:speciality,
                timing:timing,
                contact:contact,
            })
         })

         location.href="#showAddedDr"

}


/* Show Listed Doctor */
let fetchDoctor = async () => {
    try {
        let tbody = document.querySelector(".tbody"); 
        let url = `http://localhost:3000/Doctors`;   // Fetch ALL doctors
        let res = await fetch(url, { method: "GET" });

        let data = await res.json(); 
        tbody.innerHTML = ""; // Clear previous data

        

        // Loop through doctors and insert into table
        data.forEach((e) => {
            tbody.innerHTML += `
                <tr>
                    <td>${e.name}</td>
                    <td>${e.age}</td>
                    <td>${e.gender}</td>
                    <td>${e.speciality}</td>
                    <td>${e.timing}</td>
                    <td>₹ ${e.Consultancy}</td>
                    <td>${e.contact}</td>
                    <td>
                        <button onclick="editDoctor('${e.id}')" id="editbutton">Edit</button>
                        <button onclick="deleteDoctor('${e.id}')" id="removebutton">Remove</button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
};

// Ensure the function runs when the page loads
window.onload = fetchDoctor;
