# React WooCommerce Frontend

Features:
- Vite + React frontend
- Component-based architecture
- Connects to backend API for products and segment evaluation

## Setup
1. Copy files into `react-frontend/`
2. Install: `npm install`
3. Add `.env` with `VITE_API_BASE` (see `.env.example`)
4. Dev: `npm run dev`
5. Build: `npm run build`

## Endpoints used
- GET `${VITE_API_BASE}/products` -> returns array of products
- POST `${VITE_API_BASE}/segments/evaluate` with `{ text: string }` -> returns filtered results

## Notes
- Uses axios for API calls.
- Tailwind is wired; you can remove and use plain CSS if preferred.