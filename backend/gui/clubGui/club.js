const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initAddClub(){
    
    ///Uzmem id-jeve svih destinacija i staff-ova i ubacim ih u select opcije
    ///Ubacivanje id-jeva u select opcije
    fetch("http://localhost:8500/admin/showDestinations",{
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("destinationId");
            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.id;
                    select.appendChild(option);
                })
            }
        })

    document.getElementById("addClubDugme").addEventListener("click", e=>{

        e.preventDefault();
        const club = {
            name: document.getElementById("clubName").value,
            numberOfCourts: document.getElementById("numberOfCourts").value,
            destinationId: document.getElementById("destinationId").value,
            creationDate: document.getElementById("date").value,
        };
        
    
        ///saljemo auth.js-u
        fetch("http://localhost:8500/admin/createClub",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(club)
         })
            .then(res => res.json())
            .then(obj => {
                if(obj.msg)
                    alert(obj.msg)
                else
                    alert("Club added successfully!");
               
            }).catch(err => console.log(err.message));
            
}
)}
function initUpdateClub(){

    fetch("http://localhost:8500/admin/showClubs",{
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("clubId");
            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.id;
                    select.appendChild(option);
                })
            }
        })

        fetch("http://localhost:8500/admin/showDestinations",{
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(data => {
                let select = document.getElementById("destinationId");
                if(data.msg){
                    alert(data.msg);
                }
                else{
                    data.forEach(element => {
                        let option = document.createElement("option");
                        option.value = element.id;
                        option.text = element.id;
                        select.appendChild(option);
                    })
                }
            })







    document.getElementById("updateClubBtn").addEventListener("click", e=>{
        e.preventDefault();
        
            let id = document.getElementById("clubId").value;
            let name= document.getElementById("clubName").value
            let numberOfCourts= document.getElementById("numberOfCourts").value
            let destinationId= document.getElementById("destinationId").value
            let creationDate= document.getElementById("date").value

            fetch("http://localhost:8500/admin/updateClub/"+id+"/"+name +"/"+numberOfCourts +"/"+destinationId +"/"+creationDate,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then(res => res.json())
                .then(data => {
                    if(data.msg)
                        alert(data.msg)
                    else
                        alert("Club updated successfully!");
                })

        })
    }
    
function initShowClubs(){
    fetch("http://localhost:8500/admin/showClubs",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        .then(res => res.json())
        .then(data => {
            document.getElementById("showClubsTable").innerHTML = "";
            let table= document.getElementById("showClubsTable");

            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    

                    let row = `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.numberOfCourts}</td>
                        <td>${element.destinationId}</td>
                        <td>${element.creationDate}</td>
                        </tr>
                    `;
                    table.innerHTML += row;
                })
            }})
        }
function initDeleteClub(){
    fetch("http://localhost:8500/admin/showClubs",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("destinationId");
            if(data.msg){
                alert(data.msg);
            }   
            else{
                data.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.id;
                    select.appendChild(option);
                })
            }
        }) 
        
    document.getElementById("deleteClubBtn").addEventListener("click", e=>{
    const id = document.getElementById("destinationId").value;
    fetch("http://localhost:8500/admin/deleteClub/"+id,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else
                alert("Club deleted successfully!");
        })  
})
}
