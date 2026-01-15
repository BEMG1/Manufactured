# Debugging Guide - QuimiPro

## 🔍 Cómo Debugear el Backend

### Opción 1: VS Code Debugger (Recomendado) ⭐

#### Pasos:

1. **Abre VS Code** en la carpeta raíz del proyecto (`InicioPaginaQuimicos`)

2. **Ve a la pestaña de Debug** (icono de play con bug en la barra lateral izquierda) o presiona `Ctrl+Shift+D`

3. **Selecciona "🔧 Debug Backend"** en el dropdown superior

4. **Presiona F5** o haz clic en el botón verde de play

5. **Coloca breakpoints** haciendo clic en el margen izquierdo de cualquier línea de código

#### Ejemplo de Breakpoints:

```typescript
// backend/src/routes/products.routes.ts
router.get('/products', (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    let filteredProducts = [...products]; // ⬅️ Coloca un breakpoint aquí

    if (category && typeof category === 'string') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    // ...
  }
});
```

#### Controles del Debugger:

- **F5** - Continue (continuar ejecución)
- **F10** - Step Over (siguiente línea)
- **F11** - Step Into (entrar a función)
- **Shift+F11** - Step Out (salir de función)
- **Ctrl+Shift+F5** - Restart
- **Shift+F5** - Stop

---

### Opción 2: Attach to Process

Si ya tienes el servidor corriendo:

1. Inicia el backend con el flag de debug:

```bash
cd backend
node --inspect node_modules/tsx/dist/cli.mjs watch src/server.ts
```

2. En VS Code, selecciona **"🔗 Attach to Backend"**

3. Presiona F5

---

### Opción 3: Console.log (Básico)

Para debugging rápido sin configuración:

```typescript
// backend/src/routes/products.routes.ts
router.get("/products", (req: Request, res: Response) => {
  console.log("📥 Request received:", req.query);
  console.log("🔍 Filtering by:", { category, search });
  console.log("✅ Results:", filteredProducts.length, "products");
});
```

---

## 🌐 Cómo Debugear el Frontend

### Opción 1: VS Code + Chrome DevTools

1. **Asegúrate que el frontend esté corriendo** (`npm run dev` en frontend)

2. En VS Code, selecciona **"🌐 Debug Frontend"**

3. Presiona F5 (abrirá Chrome automáticamente)

4. Coloca breakpoints en archivos `.tsx`:

```typescript
// frontend/src/components/ProductList.tsx
const loadProducts = async () => {
  try {
    setLoading(true);
    const data = await api.getProducts(); // ⬅️ Breakpoint aquí
    setProducts(data);
  } catch (err) {
    console.error("Error:", err); // ⬅️ O aquí
  }
};
```

### Opción 2: Chrome DevTools (Tradicional)

1. Abre `http://localhost:5173` en Chrome

2. Presiona **F12** para abrir DevTools

3. Ve a la pestaña **Sources**

4. Busca tus archivos en `webpack://` o `localhost:5173/src`

5. Coloca breakpoints haciendo clic en el número de línea

---

## 🛠️ Tips de Debugging

### Backend

#### Ver todas las requests:

```typescript
// backend/src/server.ts
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.query);
  next();
});
```

#### Inspeccionar datos:

```typescript
console.log("Products:", JSON.stringify(products, null, 2));
```

#### Debugear errores:

```typescript
try {
  // código
} catch (error) {
  console.error("❌ Error:", error);
  debugger; // ⬅️ Pausa automática aquí
}
```

### Frontend

#### Ver estado de React:

```typescript
useEffect(() => {
  console.log("Products updated:", products);
  console.log("Selected category:", selectedCategory);
}, [products, selectedCategory]);
```

#### Debugear API calls:

```typescript
// frontend/src/services/api.ts
async getProducts(category?: string, search?: string): Promise<Product[]> {
  console.log('🌐 Fetching products', { category, search });
  const products = await this.fetchFromApi<Product[]>(endpoint);
  console.log('✅ Received', products.length, 'products');
  return products;
}
```

---

## 🎯 Debugging Común

### Problema: "No puedo ver los breakpoints"

**Solución:**

- Asegúrate que `sourceMaps: true` esté en tsconfig.json
- Reinicia el debugger (Ctrl+Shift+F5)
- Verifica que estés en modo desarrollo

### Problema: "El debugger no se conecta"

**Solución:**

```bash
# Mata todos los procesos de Node
taskkill /F /IM node.exe

# Reinicia el servidor
npm run dev
```

### Problema: "Breakpoints en archivos .ts no funcionan"

**Solución:**

- VS Code solo puede debugear el código transpilado
- Asegúrate que `sourceMap: true` esté en `tsconfig.json`
- Los breakpoints deben estar en líneas ejecutables (no en imports o tipos)

---

## 📊 Variables de Entorno para Debug

Agrega a tu `.env`:

```env
# Backend
NODE_ENV=development
DEBUG=true
LOG_LEVEL=debug

# Frontend
VITE_DEBUG=true
```

Luego en el código:

```typescript
// backend
if (process.env.DEBUG === "true") {
  console.log("Debug info:", data);
}

// frontend
if (import.meta.env.VITE_DEBUG === "true") {
  console.log("Debug info:", data);
}
```

---

## 🚀 Atajos de VS Code

- `Ctrl+Shift+D` - Abrir panel de debug
- `F5` - Iniciar/Continuar debug
- `F9` - Toggle breakpoint
- `F10` - Step over
- `F11` - Step into
- `Shift+F11` - Step out
- `Ctrl+K Ctrl+I` - Mostrar hover info

---

## 📝 Ejemplo Completo de Debug Session

1. **Coloca un breakpoint** en `backend/src/routes/products.routes.ts` línea donde filtra productos

2. **Inicia el debugger** (F5 con "🔧 Debug Backend" seleccionado)

3. **En el navegador**, ve a `http://localhost:5173` y haz clic en una categoría

4. **El código se pausará** en tu breakpoint

5. **Inspecciona variables** en el panel izquierdo:

   - `req.query` - parámetros de la request
   - `filteredProducts` - productos filtrados
   - `category` - categoría seleccionada

6. **Usa la consola de debug** para ejecutar código:

   ```javascript
   filteredProducts.length;
   filteredProducts.map((p) => p.name);
   ```

7. **Continúa la ejecución** (F5) o avanza paso a paso (F10)

---

¡Listo! Ahora puedes debugear como un pro 🚀
