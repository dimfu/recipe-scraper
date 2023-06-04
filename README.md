# @dimfu/recipe-scraper

Scrap food recipe data from various websites that support JSON+LD and Microdata schema, no guessing involved.

## Install

```bash
npm install --save @dimfu/recipe-scraper
```

## Usage

### Basic

Pass a url as first parameter will attempt to extract the recipe content from that website.

```js
import getRecipeData from '@dimfu/recipe-scraper'

const url = 'https://example/recipes/creamy-courgette-potato-bake'

getRecipeData(url).then((recipe) => {
  console.log(recipe)
})
```

or with `async/await`

```js
import getRecipeData from '@dimfu/recipe-scraper'

async function run() {
  const url = 'https://example/recipes/creamy-courgette-potato-bake'
  const recipe = await getRecipeData(url)
  console.log(recipe)
}
```

### HTML String

If you already have HTML string and dont want  to make an http request, you can specify it in option object:

> **Note**
> This can be work only if there is JSON-LD or Microdata schema tags were present.

```js
import getRecipeData from '@dimfu/recipe-scraper'

const html = `
    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "Recipe",
            "name": "Classic Marinara Sauce",
            "recipeIngredient": [
                "1 28-ounce can whole tomatoes",
                "1/4 cup olive oil",
                "7 garlic peeled and slivered",
                "Small dried whole chile",
                "1 teaspoon kosher salt",
                "1 large fresh basil sprig"
            ]
        }
     </script>
`

const recipe = await getRecipeData({ html })
```

---

```js
import getRecipeData from '@dimfu/recipe-scraper'

const html = `
    <div itemscope itemtype="https://schema.org/Recipe">
        <h1 itemprop="name">Simple Marinara Sauce</h1>
        <div>
            <span itemprop="recipeIngredient">2 cans stewed tomatoes</span>
            <span itemprop="recipeIngredient">1 teaspoon dried oregano</span>
            <span itemprop="recipeIngredient">1 teaspoon salt</span>
        </div>
    </div>
`

const recipe = await getRecipeData({ html })
```

It returns back the information related to the given URL

```js
{
  "url": "https://example/recipes/creamy-courgette-potato-bake",
  "name": "Creamy courgette & potato bake",
  "image": "https://example/stryve/9ae78bc2-ad5e-449c-8626-8c9faa37054c_creamy-courgette-potato-bake.png?auto=compress,format",
  "cookTime": "45 minutes",
  "prepTime": "25 minutes",
  "totalTime": "70 minutes",
  "recipeYield": 4,
  "recipeIngredients": [
    "1000g Potato",
    "2 Courgette",
    "2 Brown onion",
    "3tsp Olive oil",
    "120g Cashew nuts",
    "200ml Vegetable stock",
    "200ml Almond milk",
    "6 Garlic cloves",
    "18tsp Nutritional yeast",
    "2tsp Sea salt",
    "2tsp Smoked paprika"
  ],
  "recipeInstructions": [
    "Add cashew nuts to a bowl with enough hot water to cover",
    "Peel and thinly slice the potatoes and courgettes",
    "Thinly slice the onion and add to a pan with olive oil – fry for ~5 mins mixing often until lightly brown",
    "Pre-heat the oven on 180°C (355°F)",
    "Drain the water from cashew nuts and place in blender with vegetable stock, almond milk, garlic, nutritional yeast and salt – blend until smooth",
    "To your oven dish add a layer potato, followed by a layer of courgette, followed by the onion",
    "Next sprinkle half of the smoked paprika on top",
    "Continue adding another layer of potato, followed by another layer of courgette and pour ⅔ of the creamy sauce on top",
    "Finish off with one more layer of potatoes, the remaining sauce and the other half of the smoked paprika – place in the oven for 45 mins"
  ]
}
```

When a field can't be retrieved, the value will be  `undefined`.

There are no guarantees about the shape of this data, because it varies with different media and scraping methods. Handle it carefully.

## Configuration

You can change the behaviour  by passing an options object:

```js
import getRecipeData from '@dimfu/recipe-scraper'

const options = {
  url: 'https://example/recipes/creamy-courgette-potato-bake', // URL of web page
  maxRedirects: 0, // Maximum number of redirects to follow (default: 5)
  timeout: 1000, // Request timeout in milliseconds (default: 10000ms)
}

getRecipeData(options).then((recipe) => {
  console.log(recipe)
})
```

You can specify the URL by either passing it as the first parameter, or by setting it in the options object.

## Command line usage

### Using without installation

```bash
npx @dimfu/recipe-scraper https://example/recipes/creamy-courgette-potato-bake 
```

> Note: Use this method only if you plan to use for one time, installing globally (see-below) is recommended for multiple time usages.

### Installation

```bash
npm install @dimfu/recipe-scraper -g
```

> Note for Linux & MacOS users: DO NOT use sudo to install global packages! The correct way is to tell npm where to install its global packages: npm config set prefix ~/.local. Make sure ~/.local/bin is added to PATH.

### Usage after installation

```
@dimfu/recipe-scraper https://example/recipes/creamy-courgette-potato-bake
```

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
