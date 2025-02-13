import { useState, useEffect } from "react";
import "./App.css";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

function App() {
  const [query, setQuery] = useState("");
  const [fieldFocused, setFieldFocused] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async (searchQuery: string) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${searchQuery}`
      );
      const data = await response.json();
      setRecipes(data?.recipes || []);
      console.log("recipes", data?.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        fetchRecipes(query);
      } else {
        setRecipes([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div>
        <h3>Autocomplete Search Bar</h3>
      </div>
      <div style={{ width: "28rem", margin: "auto" }}>
        <input
          type="text"
          id="searchField"
          value={query}
          className="w-100"
          onChange={handleChange}
          placeholder="Search Google or type a URL"
          onFocus={() => setFieldFocused(true)}
          // onBlur={() => setFieldFocused(false)}
          style={{
            width: "26rem",
            padding: "0.5rem",
            borderRadius: "10px",
            border: "1px solid gray",
            boxShadow: "3px 4px 13px gray",
          }}
        />

        {fieldFocused && (
          <div
            style={{
              width: "27rem",
              textAlign: "start",
              borderRadius: "15px",
              boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
              padding: "0.5rem",
              backgroundColor: "white",
            }}
          >
            {recipes.map((recipe) => (
              <div
                key={recipe?.id}
                style={{
                  borderBottom: "1px solid gray",
                  borderRadius: "10px",
                  paddingLeft: "10px",
                  fontSize: "12px",
                  fontWeight: "300",
                }}
              >
                <h4
                  style={{ margin: "10px 10px 6px 8px", cursor: "pointer" }}
                  onClick={() => setQuery(recipe?.name)}
                >
                  {recipe?.name}
                </h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
