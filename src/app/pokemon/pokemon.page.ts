import { Component, OnInit, ViewChild } from '@angular/core';

import { IonInfiniteScroll } from '@ionic/angular';
import {PokemonService} from './../services/pokemon/pokemon.service';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  offset = 0;
  pokemon = [];
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;//Este parametro permite seguir cargando mas datos y los presenta

  constructor(private pokeService: PokemonService) { }


  ngOnInit() {
    this.loadPokemon(); // Envio el parametro de load pokemon
  }

  loadPokemon(loadMore = false, event?){
    if(loadMore){
      this.offset+=25; //Aqui le digo que por medio de un evento me cargue mas datos pero esta vez ya no inicia de 0 si no desde el limite 25
    }
    this.pokeService.getPokemon(this.offset).subscribe(res =>{
        this.pokemon = [...this.pokemon, ...res];

        if (event){
          event.target.complete(); //Finalmente me completa los datos
        }

        if(this.offset ==125){
          this.infinite.disabled = true; // Aqui le digo que si la funcion llega hasta 125 me desahabilite los demas pokemons.
        }
    });

  }
  onSearchChange(e){ //Esta funcion es para buscar los pokemons
    let value =e.detail.value;
    console.log('hola');
    console.log(value);
    if (value ==''){
      this.offset =0;
      this.loadPokemon();
      return;
    }
  }

}
