
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initAddDestination(){
    document.getElementById("addDestinationBtn").addEventListener("click", e=>{
        e.preventDefault();
        const destination = {
            
            country: document.getElementById("countryDestination").value,
            city: document.getElementById("cityDestination").value,
            street: document.getElementById("streetDestination").value,
            numberOfStreet: document.getElementById("numberOfStreetDestination").value,
        }
        fetch("http://localhost:8500/admin/createDestination",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(destination)
        })
        .then(res => res.json())
        .then(obj => {
            if(obj.msg)
                alert(obj.msg)
        }
        ).catch(err => console.log(err.message));
    });
    
    
}
function initShowDestinations(){
    fetch("http://localhost:8500/admin/showDestinations",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        .then(res => res.json())
        .then(data => {
            document.getElementById("destinationTable").innerHTML = "";
            let table= document.getElementById("destinationTable");

            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    
                    let row = `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.country}</td>
                        <td>${element.city}</td>
                        <td>${element.street}</td>
                        <td>${element.numberOfStreet}</td>
                        </tr>
                    `;
                    table.innerHTML += row;
                })
            }}).catch(err => alert(err.message));


}
function initDeleteDestination(){
    document.getElementById("deleteDestinationBtn").addEventListener("click", e=>{
        e.preventDefault();
        
             id = document.getElementById("idDestination").value,
        
        fetch("http://localhost:8500/admin/deleteDestination/"+id,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            
        })
        .then(res => res.json())
        .then(obj => {
            if(obj.msg)
                alert(obj.msg)
            else
                alert("Destination deleted")
        }
        ).catch(err => console.log(err.message));
    });
    

}