
(() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];

    let puntosJugador = 0;
    let puntosComputadora = 0; 

    //Referencias del HTML

    const btnPedir         = document.querySelector('#btnPedir');
    const btnDetener       = document.querySelector('#BtnDetener');
    const btnNuevo         = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#Computadora-cartas');
    const puntossmall      = document.querySelectorAll('small');

    //Crea una nueva baraja
    const crearDeck = ()=>{
        
        for(let i = 2;i<=10;i++){
        
            for(let tipo of tipos ){
                deck.push( i + tipo);
            }
        }

        for( let tipo of tipos){
            for( let especial of especiales){
                deck.push( especial + tipo);

            }
        }
        deck = _.shuffle  (deck);
        return deck;

    }
    crearDeck();

    //Esta  funcion permite tomar una carta

    const pedirCarta = () =>{

        if( deck.length === 0){
            throw 'No hay cartas en el deck';

        }
        const carta = deck.pop();
        return carta

    }

    //pedirCarta();

    const valorCarta = (carta) =>{

        const valor = carta.substring(0,carta.length - 1);
        return ( isNaN( valor ) )?
                (valor === 'A')? 11 : 10
                : valor * 1;
        // let puntos = 0;

        // if( isNaN( valor ) ){
        //     //No es un numero
        //     puntos = ( valor === 'A') ? 11 : 10;

        // }else{
        //     //Es un numero
        //     puntos = valor * 1

        // }
        // console.log( puntos );

    }

    //Turno de la computadora

    const trunoComputadora = ( puntosMinimos)=>{

        do{
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta( carta );
            puntossmall[1].innerText = puntosComputadora;
        
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`; 
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);
            if(puntosMinimos>21){
                break;
            }

        }while( (puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21))
        
        
        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ){
                alert('Nadie gana');
            }else if( puntosMinimos < 21){
                alert('Computadora gana');
            }else if( puntosComputadora > 21 ){
                alert('jugador gana');
            }else {
                alert('Computadora gana')
            }
        }, 500);

    }

    //Eventos

    btnPedir.addEventListener('click', () =>{

        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta( carta );
        puntossmall[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; 
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);
        

        if( puntosJugador > 21){
            console.warn('Mamaste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            trunoComputadora( puntosJugador );

        }else if( puntosJugador === 21 ){
            console.warn('Ganaste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            
            trunoComputadora( puntosJugador );
        }

    });

    btnDetener.addEventListener('click',()=>{
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        trunoComputadora( puntosJugador );
    });

    btnNuevo.addEventListener('click' ,()=>{
        deck = [];
        deck = crearDeck()
        puntosComputadora = 0 ;
        puntosJugador = 0;

        puntossmall[0].innerText = 0;
        puntossmall[1].innerText = 0;
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';


        btnPedir.disabled = false;
        btnDetener.disabled = false;
        

    })
        
})();




