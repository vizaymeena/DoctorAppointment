function getDoctorIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id"); // Get 'id' from URL
}

let updateDoctorsGet = async () => {
    let doctorId = getDoctorIdFromURL(); // Extract ID from URL

    let url = `http://localhost:3000/Doctors/${doctorId}`;
    let res = await fetch(url, { method: "GET" });
    let data = await res.json();

    let doctorForm = document.querySelector("#doctorForm");

    // Populate form with fetched doctor data
    doctorForm.innerHTML = `
        <input value="${data.name}" type="text" id="name" placeholder="Doctor's Name" required>
        <input value="${data.age}" type="number" id="age" placeholder="Age" required>
        <input value="${data.gender}" type="text" id="gender" placeholder="Male/Female/Other">
        <input value="${data.speciality}" type="text" id="speciality" placeholder="Speciality" required>
        <input value="${data.timing}" type="text" id="timing" placeholder="Timing (e.g., 10 AM - 5 PM)" required>
        <input value="${data.fees}" type="text" id="fees" placeholder="Fees (₹)" required>
        <input value="${data.contact}" type="text" id="contact" placeholder="Contact Number" required>
        <button onclick="update('${data.id}')" type="submit">Update</button>
    `;
};

// Call function when the page loads
window.onload = updateDoctorsGet;

let update=(id)=>{

    let name = document.querySelector("#name").value.trim()
    let age = document.querySelector("#age").value.trim()
    let gender = document.querySelector("#gender").value.trim()
    let speciality = document.querySelector("#speciality").value.trim()
    let contact = document.querySelector("#contact").value.trim()
    let fees = document.querySelector("#fees").value.trim()
    let timing = document.querySelector("#timing").value.trim()

    if(!name || !age || !gender || !speciality || !contact || !fees || !timing ){
        alert("Please, fill out necessary fields")
        return false;
    }
    else if (age>100){
        alert("Age must be less than 100")
        return false;
    }
    else if (contact.length !==10){
        alert("Contact Number must of 10 digits ")
        return false;
    }
    else if(gender.toLocaleLowerCase() !=="male" && gender.toLocaleLowerCase() !=="female" && gender.toLocaleLowerCase() !== "other")
    {
        alert("Gender : Ex- 'Male/Female/Other '")
        return false;
    }

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
            fees:fees,
            timing:timing,
            contact:contact,
        })
    }).then((e) => {
        alert("Doctor updated successfully!");
        location.href = "admin.html"; 
    })
}




