import { Component, ViewChild, OnInit } from '@angular/core';
import * as dictionary from  '../dictionary';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchVal = "";
  isLoading = false;
  public tempWords: any = [];
  public results: any = [];
  

  constructor() { }

  ngOnInit() {
  }

  setLoader(cb) {
    setTimeout(() => {
      this.generate();
      cb();
    }, 500);
  }

  start () {
    if (this.isLoading)
      return;
    this.tempWords = [];
    this.isLoading = true;
    this.setLoader(() => this.isLoading = false);
  }

  clear () {
    this.searchVal = "";
    this.tempWords = [];
    this.results = [];
  }

  onKeyPress (event: any) {
    if(event.keyCode  === 13 && !this.isLoading)
      this.start();
  }

  generate  () {
    this.tempWords = [];
    this.results = [];
    this.getPermutations("", this.searchVal);
  }

  getPermutations (prefix:string, word:string) {
    word = word.toLowerCase();
    let n = word.length;
    if (n != 0) {
        for (let i = 0; i < n; i++) {
            if ( !(this.tempWords.indexOf(prefix + word[i]) > -1) && dictionary.map.hasOwnProperty(prefix + word[i])) { 
                this.tempWords.push(prefix + word[i]);
                this.exsist(prefix + word[i]);
            }
            this.getPermutations(prefix + word[i], word.substring(0, i) + word.substring(i+1, n));
        }
    }
  }

  exsist(word:string) {
    let found = false;
    for (let arr of this.results) {
      if (arr.length > 0) {
        if (arr[0].length == word.length) {
          arr.push(word);
          found = true;
          break;
        }
      }
    }
    if (!found) {
      let tempArr = [];
      tempArr.push(word);
      this.results.push(tempArr);
      this.results.sort(this.compare);
    }
  }

  compare(a,b) {
    if (a[0].length < b[0].length)
      return -1;
    if (a[0].length > b[0].length)
      return 1;
    return 0;
  }

  getScore (word:string) {
    return dictionary.map[word];
  }


}
