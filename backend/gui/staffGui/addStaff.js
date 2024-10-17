const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initAddStaff(){

    ///dodati klub id-jeve
     ///Uzmem id-jeve svih destinacija i staff-ova i ubacim ih u select opcije
    ///Ubacivanje id-jeva u select opcije
    fetch("http://localhost:8500/admin/showClubs",{
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        },
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("clubIdAddStaff");
            
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
    document.getElementById("addStaffDugme").addEventListener("click", e=>{
        e.preventDefault();
        
        
        const user = {
            name: document.getElementById("firstNameAddStaff").value,
            lastName: document.getElementById("lastNameAddStaff").value,
            years: document.getElementById("yearsOldAddStaff").value,
            email: document.getElementById("emailRegistration").value,
            clubId: document.getElementById("clubIdAddStaff").value,
        };

        ///saljemo auth.js-u
        fetch("http://localhost:8500/admin/createStaff",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(obj => {
               
            }).catch(err => alert(err));
 
}
)}

function initShowStaff(){
    fetch("http://localhost:8500/admin/showStaff",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        .then(res => res.json())
        .then(data => {
            document.getElementById("searchStaffTable").innerHTML = "";
            let table= document.getElementById("searchStaffTable");

            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    let row = `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.lastName}</td>
                        <td>${element.years}</td>
                        <td>${element.email}</td>
                        </tr>
                    `;
                    table.innerHTML += row;
                })
            }})
        }
function initDeleteStaff(){

    fetch("http://localhost:8500/admin/showStaff",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then(res=>res.json())
      .then(data=>{
        let select = document.getElementById("idDeleteStaff");
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


    document.getElementById("deleteStaffDugme").addEventListener("click", e=>{
    
    const id = document.getElementById("idDeleteStaff").value;
    fetch("http://localhost:8500/admin/deleteStaff/"+id,{
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
            }else{
                alert("Staff deleted successfully!");
            }
        })  
})
}
