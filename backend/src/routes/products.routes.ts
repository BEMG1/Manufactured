import { Router, Request, Response } from "express";
import { products, categories } from "../data";
import { ApiResponse, Product, Category } from "../types";

const router = Router();

// GET /api/products - Get all products with optional category filter and search
router.get("/products", (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    let filteredProducts = [...products];

    // Filter by category
    if (category && typeof category === "string") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category
      );
    }

    // Search by name or description
    if (search && typeof search === "string") {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    const response: ApiResponse<Product[]> = {
      success: true,
      data: filteredProducts,
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<Product[]> = {
      success: false,
      error: "Error al obtener productos",
    };
    res.status(500).json(response);
  }
});

// GET /api/products/:id - Get single product by ID
router.get("/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = products.find((p) => p.id === id);

    if (!product) {
      const response: ApiResponse<Product> = {
        success: false,
        error: "Producto no encontrado",
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<Product> = {
      success: false,
      error: "Error al obtener producto",
    };
    res.status(500).json(response);
  }
});

// GET /api/categories - Get all categories
router.get("/categories", (req: Request, res: Response) => {
  try {
    const response: ApiResponse<Category[]> = {
      success: true,
      data: categories,
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<Category[]> = {
      success: false,
      error: "Error al obtener categorías",
    };
    res.status(500).json(response);
  }
});

export default router;
