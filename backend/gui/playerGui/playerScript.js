const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initAddPlayer(){
    
    ///Uzmem id-jeve svih destinacija i staff-ova i ubacim ih u select opcije
    ///Ubacivanje id-jeva u select opcije
    fetch("http://localhost:8500/admin/showClubs",{
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("playerClubId");
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

    document.getElementById("addPlayerBtn").addEventListener("click", e=>{

        e.preventDefault();
        
        //dodaj joi za playera

        const player = {
            name: document.getElementById("playerName").value,
            lastName: document.getElementById("lastNameAddPlayer").value,
            clubId: document.getElementById("playerClubId").value,
            tourPoints: document.getElementById("tourPoints").value,
            years: document.getElementById("yearsAddPlayer").value,
        };
        
    
        ///saljemo auth.js-u
        fetch("http://localhost:8500/admin/createPlayer",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(player)
         })
            .then(res => res.json())
            .then(obj => {
                if(obj.msg)
                    alert(obj.msg)
                else
                    alert("Player added successfully!");
               
            }).catch(err => console.log(err.message));
}
)}

function initSearchPlayer(){


    fetch("http://localhost:8500/admin/showPlayers",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("playerId");
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
 
        document.getElementById("searchPlayerButton").addEventListener("click", e=>{
            e.preventDefault();
            const player = {
                id: document.getElementById("playerId").value,
            };
            fetch("http://localhost:8500/admin/showPlayers/" + player.id,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(res => res.json())
                .then(obj => {
                    if(obj.msg){
                        alert(obj.msg);
                    }
                    else{
                        document.getElementById("playerName").innerHTML = "Ime : "+obj.name;
                        document.getElementById("lastNameAddPlayer").innerHTML ="Prezime : " +obj.lastName;
                        document.getElementById("playerClubId").innerHTML = "Club id : "+obj.clubId;
                        document.getElementById("tourPoints").innerHTML ="Broj bodova : "+obj.tourPoints;
                        document.getElementById("yearsAddPlayer").innerHTML = "Godine : "+obj.years;
                    }
                }
                ).catch(err => console.log(err.message));
        })

}
function initUpdatePlayer(){


    fetch("http://localhost:8500/admin/showClubs",{
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("playerClubId");
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

        fetch("http://localhost:8500/admin/showPlayers",{
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(data => {
                let select = document.getElementById("playerId");
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





document.getElementById("updatePlayerBtn").addEventListener("click", e=>{
    e.preventDefault();
    const player = {
        id: document.getElementById("playerId").value,
        name: document.getElementById("playerName").value,
        lastName: document.getElementById("lastNameAddPlayer").value,
        clubId: document.getElementById("playerClubId").value,
        tourPoints: document.getElementById("tourPoints").value,
        years: document.getElementById("yearsAddPlayer").value,
    };

    fetch("http://localhost:8500/admin/players/" + player.id+"/"+player.name+"/"+player.lastName +"/"+player.clubId+"/"+player.tourPoints+"/"+player.years,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
       .then(res => res.json())
          .then(data => {
                if(data.msg){
                    alert(data.msg);
                }
                else{
                    alert("Uspešno ste promijenili korisnika!");
                }
            }
        ).catch(err => console.log(err.message));
        })
    }
function initShowClubs(){
    fetch("http://localhost:8500/admin/showPlayers",{
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
                        <td>${element.lastName}</td>
                        <td>${element.tourPoints}</td>
                        <td>${element.years}</td>
                        <td>${element.clubId}</td>
                        </tr>
                    `;
                    table.innerHTML += row;
                })
            }})
        }

function initDeletePlayer(){

    fetch("http://localhost:8500/admin/showPlayers",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("playerClubId");
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

    document.getElementById("deletePlayerBtn").addEventListener("click", e=>{

    const id = document.getElementById("playerClubId").value;
    fetch("http://localhost:8500/admin/deletePlayer/"+id,{
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
                alert("Player deleted successfully!");
        })  
})
}



    

