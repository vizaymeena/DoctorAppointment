/* Book Appointment */
/* Post Method */

async function appSubmit() {
    let name = document.querySelector("#name").value.trim();
    let age = document.querySelector("#age").value.trim();
    let gender = document.querySelector("#gender").value.trim();
    let contact = document.querySelector("#cont").value.trim();
    let address = document.querySelector("#add").value.trim();
    let pincode = document.querySelector("#pincode").value.trim();

    // Validation
    if (!name || !age || !gender || !contact || !address || !pincode) {
        alert("Form fields cannot be empty");
        return;
    }

    if (isNaN(age) || age > 100) {
        alert("Age should be a number and less than 100");
        return;
    }

    if (contact.length !== 10 || isNaN(contact)) {
        alert("Invalid mobile number");
        return;
    }

    if (pincode.length !== 6 || isNaN(pincode)) {
        alert("Invalid pincode");
        return;
    }

    if (gender.toLowerCase() !== "male" && gender.toLowerCase() !== "female") {
        alert("Invalid gender");
        return;
    }

    let url = "http://localhost:3000/Patient";

    try {
         await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                age: age,
                gender: gender,
                contact: contact,
                address: address,
                pincode: pincode
            })
        });

        }
     catch (error) {
        console.error("Error Error error:", error);
        alert("Network error. Please try again.");
    }


    location.href="userform.html"
    return false;
}

/* Book Appointment */
/* Get Method */
//onload wala function
let appoint = async () => {
 
   
    let filledForm = document.querySelector(".filledform");
    let appointBody = document.querySelector(".appointBody")
    

   
        let url = "http://localhost:3000/Patient";
        let res = await fetch(url,{method:"GET"});
        let data = await res.json();

        if (data.length === 0) {
            filledForm.innerHTML = "<p>No appointments submitted yet.</p>";
        } else {

             filledForm.style.isplay="flex" // table div 

             let last = data[data.length - 1]; // latestsubmission

             // NOTE : forEach function is not used to display single data 
                
                appointBody.innerHTML += 
            // Loop through data and add rows
                `
                 
                    <tr class="tr">
                        <td>${last.name}</td>
                        <td>${last.age}</td>
                        <td>${last.gender}</td>
                        <td>${last.contact}</td>
                        <td>${last.address}</td>
                        <td>${last.pincode}</td>
                        <td class="button">

                            <button onclick="edit('${last.id}')" class="btn-edit"> Edit </button> 
                            <button onclick="finalCancel('${last.id}')" class="btn-cancel"> Cancel </button>
                            
                        </td>
                    </tr>
                   
                </table>`;

        }
} 
   

/* Book Appointment */
/* Edit Method */

/* Edit() defined above */
let edit= async (id)=>{

    let url      =  `http://localhost:3000/Patient/${id}`
    let res      =  await fetch(url,{method:"GET"})
    let data     =  await res.json()

    let editContainer = document.querySelector(".editcont")

    

    editContainer.innerHTML =

    // Edit Form 
       `
       
        <h3>Edit Detials</h3>

        <div class="edit-c1">
          <p>Name: </p>   <input id="edit-name" type="text" placeholder="Name" value="${data.name}" >
          <P>Age:  </P>   <input id="edit-age" type="text" placeholder="Age" value="${data.age}" >
          <p>Gender:</p>  <input id="edit-gender" type="text" placeholder="Gender" value="${data.gender}" >
        </div>
 
        <div class="edit-c2">
         <p>Contact  </p>  <input id="edit-cont" type="text" placeholder="Contact" value="${data.contact}" >
         <p>Address: </p>  <input id="edit-add" type="text" placeholder="Address" value="${data.address}" >
         <p>Pincode: </p>  <input id="edit-pincode" type="text" placeholder="Pincode" value="${data.pincode}" >
        </div>
        
 
        <input onclick="finalEdit('${data.id}')" class="finalEditbtn" type="submit" name="" id="submit">

       `

       let editContId = document.querySelector("#editcont")
           editContId.scrollIntoView({behavior:"smooth"}) // Smooth scroll behaviour

       location.href="#editcont"                            // Jump to edit Form
       
       return false;
}

/* PUT METHOD */
/* FinalEdit() Function defined above */
let finalEdit=(id)=>{

    let name     =  document.querySelector("#edit-name").value.trim()
    let age      =  document.querySelector("#edit-age").value.trim()
    let gender   =  document.querySelector("#edit-gender").value.trim()

    let contact  =  document.querySelector("#edit-cont").value.trim()
    let address  =  document.querySelector("#edit-add").value.trim()
    let pincode  =  document.querySelector("#edit-pincode").value.trim()


    if(!name || !age || !gender || !contact || !address || !pincode){
        alert("Fill out necessary fileds in order to proceed further")
        return false;
    }

    else if( age > 100 ){
        alert("Age must be meant to below 100")
        return false;
    }

    else if(gender.toLowerCase() !=="male" && gender.toLowerCase() !=="female" && gender.toLowerCase() !=="other"){

        alert("Invalid gender")
        return false;
    }

    else if ( pincode.length !== 6 ){
        alert("Invalid Pincode")
        return false;
    }

    else if(contact.length !==10){
        alert("Invalid Mobile Number")
        return false;
    }


    // Put Method Starts
      let url  =  `http://localhost:3000/Patient/${id}`
         
           fetch(url,{method:"PUT",

            header:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    name:name,
                    age:age,
                    gender:gender,
                    contact:contact,
                    address:address,
                    pincode:pincode

                }
            )
           })
        
         location.href="#updatedForm"

}

/* Edit Method Ends */

/* Book Appointment */
/* Cancel Method */
let finalCancel = (id) => {
    let url = `http://localhost:3000/Patient/${id}`
    
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