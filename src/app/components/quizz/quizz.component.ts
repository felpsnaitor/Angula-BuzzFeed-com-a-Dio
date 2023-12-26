import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title:string = "Titulo"

  questions:any 
  questionSelected:any

  respostas:string[] = []
  respostaSelected:string = ""

  questionIndex:number = 0
  questionsMaxIndex = 0

  finalizado:boolean = false
  
  ngOnInit(): void { 
    if (quizz_questions){
      this.finalizado = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionsMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.respostas.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1
    if(this.questionsMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const respostaFinal:string = await this.checkResult(this.respostas)
      this.finalizado = true
      // quando coloca "as keyof typeof" Esta dizendo ao quizz_questions.results que o respostaFinal é do mesmo tipo que ele.
      this.respostaSelected = quizz_questions.results[respostaFinal  as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(anwsers:string[]){
    const result = this.respostas.reduce((previous, current, i, arr) => {
      if(arr.filter(item => item === previous).length >  arr.filter(item => item === current).length){
        return previous
      } else { return current}
    })
    return result  
  }
}




