const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function init(){
    
    ///Uzmem id-jeve svih destinacija i staff-ova i ubacim ih u select opcije
    ///Ubacivanje id-jeva u select opcije
    fetch("http://localhost:8500/admin/showMatches",{
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("matchId");
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

    document.getElementById("addResultButton").addEventListener("click", e=>{

        e.preventDefault();
        const tournament = {
              matchId: document.getElementById("matchId").value,
              firstSetGemsWinner: document.getElementById("firstSetWinner").value,
              firstSetGemsLooser: document.getElementById("firstSetLooser").value,
              secondSetGemsWinner: document.getElementById("secondSetWinner").value,
              secondSetGemsLooser: document.getElementById("secondSetLooser").value,
              thirdSetGemsWinner: document.getElementById("thirdSetWinner").value,
              thirdSetGemsLooser: document.getElementById("thirdSetLooser").value,  
        };
        
        ///saljemo auth.js-u
        fetch("http://localhost:8500/admin/createResult",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(tournament)
         })
            .then(res => res.json())
            .then(obj => {
                if(obj.msg)
                    alert(obj.msg)
                else
                    alert("Result added successfully!");
               
            }).catch(err => console.log(err.message));
}
)}

function initShowMatches(){
    fetch("http://localhost:8500/admin/showResults",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        .then(res => res.json())
        .then(data => {
            document.getElementById("resultsTable").innerHTML = "";
            let table= document.getElementById("resultsTable");

            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    
                    let row = `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.firstSetGemsWinner}</td>
                        <td>${element.firstSetGemsLooser}</td>

                        <td>${element.secondSetGemsWinner}</td>
                        <td>${element.secondSetGemsLooser}</td>

                        <td>${element.thirdSetGemsWinner}</td>
                        <td>${element.thirdSetGemsLooser}</td>

                        <td>${element.matchId}</td>
                     
                        </tr>
                    `;
                    table.innerHTML += row;
                })
            }})
        }
function initDeleteResult(){

    fetch('http://localhost:8500/admin/showResults', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then(res=>res.json())
      .then(data=>
        
        {
            let select = document.getElementById("resultIdInput");
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


    document.getElementById("deleteResultBtn").addEventListener("click", e=>{
        e.preventDefault();
    
    const id = document.getElementById("resultIdInput").value;
    fetch("http://localhost:8500/admin/deleteResult/"+id,{
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
                alert("Result deleted successfully!");
        })  
})
}
