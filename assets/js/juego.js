
const miModulo = (() => { //Estos nos ayudan a que no se accedan al codigo
    'use strict'


    let deck         = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0; 
    let puntosJugadores = [];

    //Referencias del HTML

    const btnPedir         = document.querySelector('#btnPedir'),
          btnDetener       = document.querySelector('#BtnDetener'),
          btnNuevo         = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),   
          puntossmall      = document.querySelectorAll('small');
    
    
    //Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 1 )=> {
        deck = crearDeck();

        puntosJugadores = [];
        for ( let i = 0 ; i< numJugadores; i++ ){
            puntosJugadores.push(0);
        }

        puntossmall.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach(elem =>elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //Crea una nueva baraja
    const crearDeck = ()=>{
        deck = [];
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
         
        return _.shuffle  (deck);

    }
    

    //Esta  funcion permite tomar una carta

    const pedirCarta = () =>{

        if( deck.length === 0){
            throw 'No hay cartas en el deck';

        }
        return deck.pop();

    }

    //Obtiene el valor de la carta con letra;

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
    //turno: 0 = primer jugador y el  ultimo  sera de la computadora
    const acumularPuntos = (carta, turno ) =>{

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntossmall[turno].innerText =puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno)=> {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; 
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = ()=>{

        const [puntosMinimos,puntosComputadora] = puntosJugadores

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
        }, 600);
    }
    //Turno de la computadora

    const trunoComputadora = ( puntosMinimos)=>{
        let puntosComputadora = 0;
        do{
            // puntosComputadora = puntosComputadora + valorCarta( carta );
            // puntossmall[1].innerText = puntosComputadora;
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta,puntosJugadores.length-1);
            crearCarta( carta, puntosJugadores.length-1);

            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`; 
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);


        }while( (puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21))
        
        determinarGanador();


    }

    //Eventos

    btnPedir.addEventListener('click', () =>{

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0 );
        // puntosJugador = puntosJugador + valorCarta( carta );
        // puntossmall[0].innerText = puntosJugador;
        crearCarta(carta,0);


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
        inicializarJuego();
        
        

        

    })
    return {
        nuevoJuego : inicializarJuego
    };
        
})();




