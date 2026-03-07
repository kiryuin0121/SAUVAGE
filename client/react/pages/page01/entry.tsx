// entry point of index.html.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../tailwind.css";
import Header from "../../components/shared/Header";
import ProductDetail from "../../components/pages/page01/ProductDetail";
import ReviewList from "../../components/pages/page01/ReviewList";

// component
const mounts = [
  { id: "header", component: <Header /> },
  { id: "product-detail", component: <ProductDetail /> },
  { id: "review-list", component: <ReviewList /> },
];
mounts.forEach(({ id, component }) => {
  const el = document.getElementById(id);
  if (el) {
    createRoot(el).render(<StrictMode>{component}</StrictMode>);
  }
});
