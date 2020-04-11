import { Component } from '@angular/core';
import { animationFrameScheduler } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  /*******************************
  * Initialisation des variables *
  *******************************/

  animalIndex: number = null;
  animalSound: HTMLAudioElement = null;
  cheatMode: boolean = true;

  animals: Array<{ title: string, image: string, desc: string, file: string, playing: boolean }> = [
    {
      'title': 'Vache',
      'image': 'img/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'img/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'img/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'img/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'img/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'img/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'img/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'img/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'img/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];


  constructor(private toastCtrl: ToastController) { }


  // Obtenir un animal aléatoire à l'intérieur du tableau
  pickAnimal() {
    // si le choix n'a pas déjà été fait
    if (this.animalIndex == null) {
      this.animalIndex = Math.floor(Math.random() * this.animals.length)
    }
  }


  playSound() {
    // Arrêt du son en cours au clique de l'utilisateur
    if (this.animalSound && this.animalSound.duration != this.animalSound.currentTime) {
      this.animalSound.pause();
    }

    // Appel de la fonction pour le choix de l'animal
    this.pickAnimal();
    // Récupération de l'animal choisi
    let animal = this.animals[this.animalIndex];


    //Lecture du son
    this.animalSound = new Audio("/assets/" + animal.file);
    this.animalSound.load();
    this.animalSound.play();

    // Mode triche
    if (this.cheatMode) {
      // Afficher l'icone du son en train de jouer
      animal.playing = true;

      // Masquage de l'icône à la fin du son
      this.animalSound.ontimeupdate = (ev) => {
        if (this.animalSound.duration == this.animalSound.currentTime) {
          this.animals[this.animalIndex].playing = false;
        }
      }
    }
  }



  guessAnimal(animalName) {
    // L'utilisateur doit cliquer sur jouer pour commencer
    if (this.animalIndex == null) {
      this.showToast("Cliquez sur \"JOUER\"");
    
    // L'utilisateur a gagné 
    } else if (this.animals[this.animalIndex].title == animalName) {
      this.showToast("Gagné !");
      // Réinitialisation du jeu
      this.animalSound.ontimeupdate = null;
      this.animals[this.animalIndex].playing = false;
      this.animalSound.pause();
      this.animalIndex = null;

    } else {
      this.showToast("Perdu !");
    }
  }

 // Messages de notification
  async showToast(text) {
    const toast = await this.toastCtrl.create({
      message: text, duration: 1000,
      position: 'middle'
    });

    toast.present();
  }

}
