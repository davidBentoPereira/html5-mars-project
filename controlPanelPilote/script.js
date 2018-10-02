window.onload = function () {

    /*
     Elements serveur
     */
    let puissancePropulseur = 0.5;
    let interval = null;
    let angleRotation = 0;
    const timeMove = 100;
    const pasAngleRotation = 15;
    const angleBase = 45;


    /*
     Elements DOM
     */
    const btnAvancer = document.getElementById('btnAvancer');
    const affichagePropulseur = document.getElementById('affichagePropulseur');
    const rangePropulseur = document.getElementById('rangePropulseur');
    const btnRotateUp = document.getElementById('btnRotateUp');
    const btnRotateDown = document.getElementById('btnRotateDown');
    const rocket = document.getElementById('rocketIcon');
    const affichageAngleRotation = document.getElementById('affichageAngleRotation');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const btnValiderModal = document.getElementById('btnValiderModal');
    const userName = document.getElementById('userName');
    const affichageUserName = document.getElementById('affichageUserName');
    const role = document.getElementById('role');
    const errorName = document.getElementById('errorName');


    initUser();

    let oldRotate = rocket.style;
    changePuissancePropulseur();


    btnAvancer.addEventListener('mousedown', avancer);
    btnAvancer.addEventListener('mouseup', stop);
    rangePropulseur.addEventListener('change', changePuissancePropulseur);

    btnRotateUp.addEventListener('click', rotateUp);
    btnRotateDown.addEventListener('click', rotateDown);

    btnValiderModal.addEventListener('click', closeModal);



    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') avancer();
        else if (event.key === 'ArrowUp') rotateUp();
        if (event.key === 'ArrowDown') rotateDown();
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowRight') stop();
    });

    /*
    ws.onmessage = (message) => {
        const { name, data, error } = JSON.parse(message.data);
        spaceshipData = data;


        setValLeftPannel('spanLife', data.life);
        setValLeftPannel('spanAngle', data.angle + ' °');
        setValLeftPannel('spanTurnToAngle', data.turnTo + ' °');
        setValLeftPannel('spanXPosition', Math.round(data.x));
        setValLeftPannel('spanYPosition', Math.round(data.y));
        setValLeftPannel('spanAngleTourelle', data.turretAngle + ' °');
        setValLeftPannel('spanTurnToAngleTourelle', data.turretTurnTo + ' °');
        setValLeftPannel('spanReloading', data.reloading ? 'Yes' : 'False');
        setValLeftPannel('spanReloaded', data.reloaded ? 'Yes' : 'False');
        setValLeftPannel('spanSystemHealth', Math.round(data.systemPower * 100) + ' %');
        setValLeftPannel('spanShield', Math.round(data.shieldPower * 100) + ' %');
        setValLeftPannel('spanThrusterPower', Math.round(data.systemPower * 100) + ' %');


    };
    */


    function avancer() {
        if (!interval){
            interval = setInterval(function () {
                console.log('Avance 100ms');
                /*
                spaceship:move(timeMove, puissancePropulseur);
                */
            }, timeMove)
        }
    }


    function stop() {
        clearInterval(interval);
        interval = null;
        console.log('Le vaisseaux s\'arrete');
    }

    function changePuissancePropulseur() {
        affichagePropulseur.innerText = rangePropulseur.value + ' / ' + rangePropulseur.getAttribute('max');
        puissancePropulseur = rangePropulseur.value/rangePropulseur.getAttribute('max');
        console.log(puissancePropulseur)
    }

    function rotateUp() {
        rotate('down');
    }

    function rotateDown() {
        rotate('up');
    }

    function rotate(type) {
        let oldRotate = rocket.style.transform;
        let newRotate = null;
        let angle = null;

        if (!oldRotate) oldRotate = angleBase;
        else oldRotate = oldRotate.substring(oldRotate.indexOf("(") + 1, oldRotate.indexOf("deg"));

        oldRotate = Number(oldRotate);

        if (type === 'down'){
            angle = oldRotate - pasAngleRotation;
            newRotate = "rotate(" + angle + "deg)";
            rocket.style.transform = newRotate;

        }
        else{
            angle = oldRotate + pasAngleRotation;
            newRotate = "rotate(" + angle + "deg)";
            rocket.style.transform = newRotate;

        }



        angleRotation = (angle - 45) % 360;
        affichageAngleRotation.innerText = angleRotation + ' °';
        /*
          spaceship:turnto(angleRotation);
         */

    }

    function initUser() {
        modal.style.transition = '500ms linear';
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }

    function closeModal() {
        let userNameValue = userName.value;

        if (userNameValue) {
            let roleValue = role.value;
            affichageUserName.innerText = 'Bienvenue ' + userNameValue + ', notre ' + roleValue + ' !';

            modal.style.transition = '500ms linear';
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
        else errorName.innerText = 'Veuillez entrer votre pseudo !';

    }

    function setValLeftPannel(idval, jsonVal){
        document.getElementById(idval).innerText = jsonVal;
        console.log(jsonVal);
    }

};

