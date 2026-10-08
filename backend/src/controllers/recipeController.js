import Recipe from "../models/Recipe.js";

// Create a new recipe
export const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    console.error("Create recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating recipe",
    });
  }
};

// Get all recipes belonging to the logged-in user
export const getRecipes = async (req, res) => {
  try {
    const { search, difficulty, diet } = req.query;

    const filter = {
      user: req.user._id,
    };

    // Search by recipe title or description
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Filter by difficulty
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Filter by dietary tag
    if (diet) {
      filter.dietaryTags = {
        $regex: diet,
        $options: "i",
      };
    }

    const recipes = await Recipe.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    console.error("Get recipes error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching recipes",
    });
  }
};

// Get one recipe belonging to the logged-in user
export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    console.error("Get recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching recipe",
    });
  }
};

// Update a recipe belonging to the logged-in user
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe,
    });
  } catch (error) {
    console.error("Update recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating recipe",
    });
  }
};

// Delete a recipe belonging to the logged-in user
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Delete recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting recipe",
    });
  }
};