



/* Get Method */
let fetchData = async () => {
    let drCategory = document.querySelector("#category");
    let drBody = document.getElementById("doctorBody");

    drCategory.addEventListener('change', async function () {

        let sclCategory = this.value; // Element that triggered fn.

        // If no category is selected, show the home image and hide the doctor list
        if(sclCategory === "") {
            document.querySelector(".homeimg").style.display = "flex";
            document.querySelector(".doctor-list").style.display = "none";

            return false; 
        }
        

     try{ let url = "http://localhost:3000/Doctors";
          let result = await fetch(url, { method: "GET" });
          let data = await result.json(); 

          

          // Filter doctors based on selected category
          let displayingDoctor = data.filter((e) => e.speciality === sclCategory);

          // Hide home image and show doctor list
          document.querySelector(".homeimg").style.display = "none";
          document.querySelector(".doctor-list").style.display = "flex";

          // Clear previous doctor list
          drBody.innerHTML = "";
  
          // Insert new doctor data
          displayingDoctor.forEach((e) => {
            drBody.innerHTML += `
            <tr class="fetchrow">
                <td>${e.name}</td>
                <td>${e.gender}</td>
                <td>${e.age}</td>
                <td>${e.speciality}</td>
                <td>${e.timing}</td>
                <td>${e.fees}</td>
                <td><button onclick="appoint()" class="btn-appnt" data-id="${e.id}">Book Appointment</button></td>
            </tr>
            `;
        });
     }  
     catch(error){
            console.error("Error a gayi:", error);
    }

        console.log(displayingDoctor)
    });

};

// Call fetchData to initialize the event listener
fetchData();


/* Appointment Page */
let appoint=()=>{
    location.href="appoint.html"
}

