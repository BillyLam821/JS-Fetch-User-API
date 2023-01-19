const pageDiv = document.querySelector(".page");
const pageLinks = document.createElement("ul");
pageLinks.classList.add("pagination");
pageDiv.insertAdjacentElement("beforeend", pageLinks);
contactList = document.querySelector(".contact-list");
var usrs;
var numPage;

// JavaScript Fetch API reference: https://www.w3schools.com/js/js_api_fetch.asp
// Random User Generator Public API: https://randomuser.me/
fetch("https://randomuser.me/api/?inc=name,picture,registered,email&results=53&seed=0")
    .then(res => res.json())
    .then(data => {usrs = data.results;})
    .then(() => {
        // get the number of total user
        const numUser = usrs.length;
        document.querySelector(".page-header h3").innerHTML = `Total: ${numUser}`;
        // display page 1 users
        changePage(1, usrs);

        // calculate the number of page needed
        numPage = Math.ceil(numUser / 10);
        // add needed page nav link
        for(let i = 1; i <= numPage; i++) {
            pageLinks.insertAdjacentHTML("beforeend", `
                <li>
                    <a onclick="changePage(${i})">${i}</a>
                </li>
            `);
        }
    });

function changePage(page) {
    contactList.innerHTML = "";
    
    // add contact by index based on page number
    usrs.slice((page - 1) * 10, page * 10).forEach(element => {
        // format date
        usrDate = element.registered.date
        usrDate = `${usrDate.slice(5,7)}/${usrDate.slice(8,10)}/${usrDate.slice(2,4)}`
        
        // add contact to contact list
        contactList.insertAdjacentHTML("beforeend", `
        <li class="contact-item cf">
            <div class="contact-details">
                <img class="avatar" src="${element.picture.thumbnail}">
                <h3>${element.name.first.concat(' ', element.name.last)}</h3>
                <span class="email">${element.email}</span>
            </div>
            <div class="joined-details">
                <span class="date">Joined ${usrDate}</span>
            </div>
        </li>
        `)

        // scroll windows back to top
        window.scrollTo(0, 0);
    });
}