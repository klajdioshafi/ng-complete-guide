import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  headers: HttpHeaders = new HttpHeaders(
    {'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    }
  );

  constructor(private http: HttpClient, private recipesService: RecipesService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put<Recipe[]>(
      'https://ng-course-recipe-book-27235-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes,
      {headers: this.headers}
    ).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://ng-course-recipe-book-27235-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ).pipe(map((recipes) => {
      return recipes.map((recipe) => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      });
    }),
    tap((recipes) => {
      this.recipesService.setRecipes(recipes);
    }));
  }
}
