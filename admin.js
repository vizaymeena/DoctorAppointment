let addDoctor=()=>{

    let dr_name = document.querySelector("#newDoctorName").value.trim()
    let dr_age = document.querySelector("#newDoctorAge").value.trim()
    let dr_gender = document.querySelector("#newDoctorGender").value.trim()
    let dr_contact = document.querySelector("#newDoctorContact").value.trim()
    let dr_timing = document.querySelector("#newDoctorTiming").value.trim()
    
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
                timing: dr_timing
            }
        )
    })

    // location.href=""
    return false;

}

/* ONload Get MEthod */
let getNewDoctor = async () => {
    let newDocs = document.querySelector(".showAddedDr"); // Table container
    let tableBody = document.querySelector(".newBody");

    let url = `http://localhost:3000/Doctors`;
    
    let res = await fetch(url, { method: "GET" });
    let data = await res.json();

    // **Do NOT overwrite the entire div** (Just clear table body)
    tableBody.innerHTML = ""; 

    if (data.length === 0) {
        newDocs.style.display = "flex";
        tableBody.innerHTML = `<tr><td colspan="7">No doctors have been added recently.</td></tr>`;
    } else {
        newDocs.style.display = "flex";
        let last = data[data.length - 1]; // Get the last added doctor

        // Append row to table body
        tableBody.innerHTML += `
        <tr>
          <td>${last.name}</td>
          <td>${last.age}</td>
          <td>${last.gender}</td>
          <td>${last.speciality}</td>
          <td>${last.timing}</td>
          <td>${last.contact}</td>
          <td class="btn-actions">
             <button id="btn-edit" onclick="edit('${last.id}')">Edit</button>
             <button id="btn-del" onclick="del('${last.id}')">Remove</button>
          </td>
        </tr>
        `;
    }
};




