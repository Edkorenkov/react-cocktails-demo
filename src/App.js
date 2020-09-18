import React from "react";
import "./styles.css";

export default class App extends React.Component {
  state = {
    cocktails: [
      {
        name: "Blue Lagoon",
        ingredients: ["vodka", "orange juice", "tequila"]
      },
      {
        name: "Blood Mary",
        ingredients: ["whiskey", "grenadin", "cola"]
      },
      {
        name: "Cuba Libre",
        ingredients: ["rom", "cola"]
      }
    ],
    ingredients: [
      "empty",
      "vodka",
      "tequila",
      "whiskey",
      "grenadin",
      "orange juice",
      "cola",
      "rom"
    ],
    myIngredients: []
  };

  mix(ingredients) {
    if (!ingredients.length) {
      return alert("Don't enough ingredients");
    }

    const cocktail = this.state.cocktails
      .map((cocktail) => ({
        name: cocktail.name,
        isReady: cocktail.ingredients.every((ingredient) =>
          this.state.myIngredients.includes(ingredient)
        )
      }))
      .find((cocktail) => cocktail.isReady);

    if (!cocktail) {
      return alert("It's not possible to mix the cocktail");
    }

    return alert(`You've mixed the ${cocktail.name} cocktail`);
  }

  addIngredient(ingredient, position) {
    let myIngredients;

    if (ingredient === "empty") {
      myIngredients = this.state.myIngredients.filter(
        (x, p) => p !== [position]
      );
    } else {
      myIngredients = [...this.state.myIngredients];
      myIngredients[position] = ingredient;
    }

    this.setState({ myIngredients });
  }

  render() {
    return (
      <div>
        <div>
          {[
            ...new Array(
              this.state.cocktails
                .map((x) => x.ingredients.length)
                .sort((x, y) => y - x)[0]
            ).keys()
          ].map((position) => (
            <select
              key={position}
              onChange={(e) => this.addIngredient(e.target.value, position)}
            >
              {this.state.ingredients.map((ingredient, key) => (
                <option key={key}>{ingredient}</option>
              ))}
            </select>
          ))}
          <button onClick={(e) => this.mix(this.state.myIngredients)}>
            Mix Cocktail
          </button>
        </div>
      </div>
    );
  }
}
