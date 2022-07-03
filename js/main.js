let endOfThePage = 0;

let preLoading = false;

const showPreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log('showPreloader()')
    preloader.style.display = 'block';
    preLoading = true;

}

const hidePreloader = () => {

    let preloader = document.getElementById('preloader');
    console.log('hidePreloader()')
    preloader.style.display = 'none';
    preLoading = false;

}

const getData = () => {

    if (!preLoading) {

        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {

                body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);

                for (let user of data) {
                    let pId = document.createElement('p');
                    let nameId = document.createElement('p');
                    let pWebsite = document.createElement('p');

                    pId.innerText = `User id: ${user.id}`;
                    nameId.innerText = `User Name: ${user.name}`;
                    pWebsite.innerHtml = `User URL: ${user.Website}<br />-------`;

                    body.appendChild(pId);
                    body.appendChild(nameId);
                    body.appendChild(pWebsite);

                }

                hidePreloader();

            })
            .catch(error => {
                console.log(error);

            })
    }
}

const scrollToendOfPage = () => {

    let d = document.documentElement;

    let scrollHeight = d.scrollHeight;

    let scrollTop = d.scrollTop;

    let clientheight = d.clientHeight;

    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientheight);

    console.log(scrollHeight);
    console.log(scrollTop);
    console.log(clientheight);
    console.log(sumScrollTopClientHeight);
    console.log('===================');

    if (sumScrollTopClientHeight >= scrollHeight) {

        endOfThePage += 1;

        console.log(`Scrolled to the end of pag: ${endOfThePage}`);
        getData();
    }


}

window.addEventListener('scroll', scrollToendOfPage);