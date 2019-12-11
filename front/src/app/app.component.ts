import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  data: any;
  constructor(private apollo: Apollo) {
    this.apollo.query({
        query: gql`
query {
    users {
        id
        name
    }
}
        `
    }).subscribe(result => {
        this.data = result.data;
    })
  }


}
