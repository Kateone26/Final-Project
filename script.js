
// burger bar

let navigation = document.getElementById('navbarlinks');
let togglebutton = document.getElementById('toggleburger');
let bar1 = document.getElementById('bar1');
let bar2 = document.getElementById('bar2');
let bar3 = document.getElementById('bar3');

togglebutton.addEventListener('click', function(){
    navigation.classList.toggle('activenav');
    bar1.classList.toggle('rotatebar1');
    bar2.classList.toggle('removebar2');
    bar3.classList.toggle('rotatebar3');

})
// 

// slider
let data = [
    {
        id: 1,
        imageurl: 'images/slider1.jpg',
        alt: 'slider1',
    },
    {
        id: 2,
        imageurl: 'images/slider2.png',
        alt: 'slider2',
    },
    {
        id: 3,
        imageurl: 'images/slider3.jpg',
        alt: 'slider3',
    },
    {
        id: 4,
        imageurl: 'images/slider4.jpg',
        alt: 'slider4',
    }
]
let arrowleft = document.getElementById('arrow-left');
let arrowright = document.getElementById('arrow-right');
let slidercontent = document.getElementById('slider-content');

let sliderindex = 0;

function createdivtag(item){
    let divtag = document.createElement('div');
    divtag.classList.add('slide');

    return divtag;
}

function createimgtag(item){
    let tagimg = document.createElement('img');
    tagimg.setAttribute('src', item.imageurl);
    tagimg.setAttribute('alt', item.alt);
    tagimg.classList.add('image-slider')

    return tagimg;
}

function setslide(){
    slidercontent.innerHTML= ''
    let slideitem = createdivtag(data[sliderindex]);
    let imgtag = createimgtag(data[sliderindex]);

    slideitem.appendChild(imgtag);

    slidercontent.appendChild(slideitem)
    

    console.log(slideitem);
}

function arrowleftclick(){
    if (sliderindex <=0){
        sliderindex = data.length - 1;
        setslide();
        return;
    }
    sliderindex --;
    setslide();
}

function arrowrightclick(){
    if (sliderindex >= data.length - 1){
        sliderindex = 0;
        setslide();
        return;
    }
    sliderindex ++;
    setslide();
}

arrowleft.addEventListener('click', arrowleftclick);
arrowright.addEventListener('click', arrowrightclick);

setInterval( () =>{
    arrowrightclick();
}, 5000)

setslide();
//

// form


document.getElementById('registration').addEventListener('submit', function(event){
    event.preventDefault();

    let errors = {};
    let form = event.target;

    // username
    
    let username = document.getElementById('username').value;

    if (username.length < 4){
        errors.username = '*Field must contain at least 4 characters'
    }

    if (username == ''){
        errors.username = '*Field can not be empty'
    }

    // email

    let email = document.getElementById('email').value;
    if(email == ''){
        errors.email = '*Email can not be empty';
    }

    // password
    let password = document.getElementById('passw').value;
    let password2 = document.getElementById('passw2').value;

    if (password!=password2 ){
        errors.password = '*passwords do not match'
        errors.password2 = '*passwords do not match';

    }

    if (password.length < 8){
        errors.password = '*Password must contain at least 8 characters'
    }

    if (password == ''){
        errors.password = '*Password can not be empty'
    }

    if (password2.length < 8){
        errors.password2 = '*Password must contain at least 8 characters'
    }

    if (password2 == ''){
        errors.password2 = '*Password can not be empty'
    }

    // checkbox

    let agree = document.getElementById('checkagree').checked;

    if (!agree ){
        errors.agree = '*you must agree to proceed'
    }



    console.log(errors);

    form.querySelectorAll('.error-text').forEach(item =>{
        item.innerHTML = ' ';

    })

    for (let item in errors){
        console.log(item);
        let errorspan = document.getElementById('error_'+ item);

        if (errorspan){
            errorspan.textContent = errors[item];
        }
    }

    if(Object.keys(errors).length == 0){
        form.submit();
    } 
})

// show/hide password

let passwordshow = document.querySelector('.pass')
let toggleiconeye = document.getElementById('toggleicon');

showhidepassword = ()=>{
    if(passwordshow.type == "password"){
        passwordshow.setAttribute('type', 'text');
        toggleiconeye.classList.add('fa-eye-slash');
    } else{
        toggleiconeye.classList.remove('fa-eye-slash');
        passwordshow.setAttribute('type', 'password');
    }
}

toggleiconeye.addEventListener('click', showhidepassword);


let passwordshow2 = document.querySelector('.pass2')
let toggleiconeye2 = document.getElementById('toggleicon2');

showhidepassword2 = ()=>{
    if(passwordshow2.type == "password"){
        passwordshow2.setAttribute('type', 'text');
        toggleiconeye2.classList.add('fa-eye-slash');
    } else{
        toggleiconeye2.classList.remove('fa-eye-slash');
        passwordshow2.setAttribute('type', 'password');
    }
}

toggleiconeye2.addEventListener('click', showhidepassword2);

// email validation

function validation(){
    let email = document.getElementById('email').value;
    let spantext = document.getElementById('error_email');
    let emailstricture = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.match(emailstricture)) {
        spantext.innerHTML = 'valid';
        spantext.style.color = 'green'
    } else{
        spantext.innerHTML = 'ivalid';
        spantext.style.color = 'red'
    }
}

// form ^


// api info: // get data
function fetchdata(){
    fetch('https://reqres.in/api/users?results=3')
        .then(response=>{
            if(!response.ok){
                throw Error('error')
            }
            return response.json();
        })
        .then(data=>{
            const html = data.data.map(user=>{
                return `
                <div class="user">
                    <p><img class="api-img" src=" ${user.avatar}" alt="user.first_name"></p>
                    <p class="api-name"> ${user.first_name}</p>
                    <a class="js-email" href="mailto:mail@gmail.com"> ${user.email}</a>
                </div>
                
                `
            })
            .join('');
            document.querySelector('#app').insertAdjacentHTML('afterbegin', html );
        })
        .catch(error =>{
            console.log(error);
        });
}
fetchdata();
// api info